
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../App";
import bcrypt from 'bcryptjs';
import Axios from "axios"



export const useUserLog = () =>{

    return useQuery({
        queryKey: ['usl'],
        queryFn: async () =>{
            const response = await Axios.get(`http://localhost:3000/api/mostrar?tabela=USUARIO`);
            return response.data;
        }
    })
}

  
export const useUserChange = () =>{

    const queryClient = useQueryClient()

    const {user} = useContext(AppContext)

    const {mutateAsync : chgUser} = useMutation({
        mutationFn: async (nUser) =>{
            const response = await Axios.put(`http://localhost:3000/api/atualizar`,{
                tabela:"USUARIO",
                dados: nUser,
                ID: user.ID
            });
            return response.data;
        },
        
        onSuccess: () =>{
            queryClient.invalidateQueries(["ugu"])
        }
    })


    return{chgUser}
};

export const useEndChange = () =>{

    const queryClient = useQueryClient()

    const {user} = useContext(AppContext)

    const {mutateAsync : chgEnd} = useMutation({
        mutationFn: async (info) =>{
            const response = await Axios.put(`http://localhost:3000/api/atualizar/endereco`,{
                dados: info,
                ID: user.ID
            });
            return response.data;
        },
        
        onSuccess: () =>{
            queryClient.invalidateQueries(["ugu"])
        }
    })


    return{chgEnd}
};


export const SwitchOp = () =>{

    const {data: UserData} = useUserLog();
    const {user} = useContext(AppContext)
    
    
    const saltRounds = 10;

    const Confirmar = async (senha, novasenha) =>{
    const index = UserData.findIndex((item) => item.ID === user.ID);
    const userio = UserData[index]
        try{
            
            const senhaCorreta = await bcrypt.compare(senha, userio.UPASS);
            
            if(!senhaCorreta){
                
                alert.apply("Senha Incorreta")

                return {success:false, pass:undefined};

            }
            console.log(novasenha, saltRounds)
            const novaSenhaCript = await bcrypt.hash(novasenha, saltRounds);
            console.log("bomba")
            return {success:true, pass:novaSenhaCript};

        }catch(error){
            console.error("Erro ao buscar usuário:", error);
            return { success: false, info: null, message: "Erro ao buscar usuário" };
        }



    }

    const Clear = (objeto) => {
        const novoObjeto = {};
        Object.entries(objeto).forEach(([chave, valor]) => {
          if (valor !== "") {
            novoObjeto[chave] = valor;
          }
        });
        return novoObjeto;
      };

    return { Confirmar , Clear};
}



