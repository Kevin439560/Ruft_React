
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import bcrypt from 'bcryptjs';
import Axios from "axios"
import { useContext } from "react";
import { AppContext } from "../App";


// Crie uma função de componente para utilizar o hook useQuery
const useVerificaQuery = () => {

    return useQuery({
      queryKey: ['uss'],
      queryFn: async () => {
        const response = await Axios.get(`http://localhost:3000/api/mostrar/item?tabela=USUARIO&item=UEMAIL`);
        return response.data;   
      }
    });
};

export const useUserLog = () =>{

    return useQuery({
        queryKey: ['usl'],
        queryFn: async () =>{
            const response = await Axios.get(`http://localhost:3000/api/mostrar?tabela=USUARIO`);
            return response.data;
        }
    })
}

export const useGetEnd = () => {
    const {user} = useContext(AppContext)
    return useQuery({
        queryKey:['uss'],
        queryFn: async() =>{
            try {
                const response = await Axios.get(`http://localhost:3000/api/obter/endereco?ID=${user.ID}`);
                console.log(response.data, 9090);
                return response.data;
            } catch (error) {
                console.error("Erro na consulta:", error);
                throw error;
            }
           
        }
    })
}

export const Endereco = () =>{
    const {info} = useGetEnd();
    const {user} = useContext(AppContext)
    const getEnd = async () =>{
        
        const index = info.findIndex((item) => item.ID === user.ENDID);
        
        return info[index];
    }
    return{getEnd}
}
  
export const useUserAdd = () =>{

    const queryClient = useQueryClient()

    const {mutateAsync : addEnd} = useMutation({

        mutationFn: async () =>{

            try{
                const response = await Axios.post(`http://localhost:3000/api/inserir/ENDERECO`,{
                    tabela: "ENDERECO",
                    dados: {}
                });
                const {novoID: endid} = response.data
                return endid;
            }catch(error){
                console.error("Erro ao adicionar Endereco")
            }
            
        },
    
    })

    const {mutateAsync : addUser} = useMutation({
        mutationFn: async (nUser) =>{
            const response = await Axios.post(`http://localhost:3000/api/inserir`,{
                tabela:"USUARIO",
                dados: nUser
            });
            return response.data;
        },
        
        onSuccess: () =>{
            queryClient.invalidateQueries(["uss"])
        }
    })


    return{addUser, addEnd}
};


// Função Verifica agora chama o hook personalizado useVerificaQuery
export const Ver = () => {
    const { data } = useVerificaQuery();
    const Verifica = (email) =>{
        
        const nova = data.map((item => item.UEMAIL))

        const index = nova.findIndex((item) => item === email);
        if (index !== -1) {
            console.log("Email ja registrado")
        return true;
        } else {
            console.log("Email nao registrado")
        return false;
        }
    }

    return {Verifica}

};


export const LogUsuario = () =>{

    const {data: UserData} = useUserLog();

    const Confirmar = async (email, senha) =>{
    
        try{
            
            if(!UserData){

                return {success :false, info : null, message : "Dados Inválidos"};

            }
            const index = UserData.findIndex((item) => item.UEMAIL === email);

           
            
            if(index === -1){

                return {success :false, info : null, message : "Email Não Encontrado"};

            }

            const Usuario = UserData[index]
            
            const senhaCorreta = await bcrypt.compare(senha, Usuario.UPASS);

            if(!senhaCorreta){
                
                return {success :false, info : null,  message : "Senha Incorreta"};

            }

           
            return {success :true, info : Usuario, message : "Login Bem-Sucedido"};

        }catch(error){
            console.error("Erro ao buscar usuário:", error);
            return { success: false, info: null, message: "Erro ao buscar usuário" };
        }



    }

    return { Confirmar };
}

// Função para Adicionar Usuário 
export const CadUsuario = () => {

    const {addUser, addEnd} = useUserAdd()
    const CadU = async (newUser) =>{
        const saltRounds = 10;
        try{
            
            const endid = await addEnd()
            console.log(newUser.UPASS)
            const senha = newUser.UPASS
            const senha_cript = await bcrypt.hash(senha, saltRounds);
            const nUser = {
                UNOME: newUser.UNOME,
                UEMAIL: newUser.UEMAIL,
                UPASS: senha_cript,
                PHONE: newUser.PHONE,
                ENDID: endid,
                
            }
            
            console.log(nUser)

            const userID = await addUser(nUser)

            nUser.ID = userID

            return nUser;

        }catch(error){
            console.error("Erro ao cadastrar novo usuário!", error)
        }
        

    }

    return{CadU}
}


