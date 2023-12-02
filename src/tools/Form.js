import React, {  useContext } from 'react';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom"
import * as yup from 'yup';
import images from '../tools/images'
import { AppContext } from '../App';
import { Ver , CadUsuario, LogUsuario} from './apiLogin';
import { SwitchOp, useEndChange,  useUserChange } from './apiConfig';


const FormLog = (props) =>{
  const {setUser} = useContext(AppContext);

  const navigate = useNavigate();
  const{Confirmar} = LogUsuario()
    const schema = yup.object().shape({
        UEMAIL : yup.string().email().required("Campo Obrigatório"),
        UPASS : yup.string().required("Campo Obrigatório")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = async (data) => {
      const {success, info, message} = await Confirmar(data.UEMAIL, data.UPASS)
      console.log(info)
      if(!success){
        alert(message);
      }else{
      
        setUser(info);
        
      
        alert(message);
        navigate('/') 
        
      }
    };

    return (
      <>
          <div className='chefe'>
         
            <div className='log_forma'>
              <h1 className='log_title'>Login</h1>
              <form onSubmit={handleSubmit(onSubmit)} className='form_log'>
                  <label htmlForfor= "text">Email:</label> 
                  <input type="text" placeholder="example@gmail.com" {...register("UEMAIL")} />
                  <p>{errors.UEMAIL?.message}</p>

                  <label htmlForfor= "num">Senha:</label> 
                  <input type="password" placeholder="********" {...register("UPASS")} />
                  <p>{errors.UPASS?.message}</p>

                <input type="submit" className='bsub'/>
              </form>
              <button className='btext' onClick={() => props.onFormSwitch("cadastro")}>Não tem uma conta? Clique Aqui!</button>
            </div>
          </div>
      </>
    );
}

const FormCad = (props) => {
  const {Verifica} = Ver()
  const {CadU} = CadUsuario()
  const navigate = useNavigate();
  const {setUser} = useContext(AppContext);
  const schema = yup.object().shape({
    UNOME: yup.string().required("Campo Obrigatório"),
    UEMAIL: yup.string().email("Insira um UEMAIL válido").required("Campo Obrigatório"),
    UPASS: yup.string().min(6, "Senhas devem ter pelo menos 6 caracteres").max(18).required("Campo Obrigatório"),
    conUPASS: yup.string().oneOf([yup.ref("UPASS"), null], "As senhas não conferem").required("Campo Obrigatório"),
    PHONE: yup.string().matches(/^(\(\d{2}\)\d{5}-\d{4}|\d{5}-\d{4}|\d{4}-\d{4}|\(\d{2}\)\d{4}-\d{4}|\d{9}|\d{8}|\d{11}|\d{10})$/, "Formato inválido de número de telefone").required("Campo Obrigatório"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    
    const emailUsado = Verifica(data.UEMAIL)
    if(emailUsado){
      alert("E-mail já está sendo usado. Escolha outro e-mail.");
    }else{
      const newUser = CadU(data);
      setUser(newUser);
      alert("Cadastro bem-sucedido!")
      navigate('/login') 
    }
    
  };

  return (
    <>
    <div className='chefe'>
      <div className='cad_forma'>
      <h1 className='log_title'>Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='form_cad'>
        <div>
          <label htmlForfor= "text">Nome:</label> 
          <input type="text" placeholder="Nome de Usuário" {...register("UNOME")} />
          <p>{errors.UNOME?.message}</p>
        <label htmlForfor= "text">Email:</label> 
          <input type="text" placeholder="Email" {...register("UEMAIL")} />
          <p>{errors.UEMAIL?.message}</p>
        <label htmlForfor= "num">Fone:</label> 
        <InputMask
                mask="(99)99999-9999"
                placeholder="Telefone"
                {...register("PHONE")}
              />
          <p>{errors.PHONE?.message}</p>
        </div>
        <div>
          <label htmlForfor= "num">Senha:</label> 
            <input type="password" placeholder="Senha" {...register("UPASS")} />
            <p>{errors.UPASS?.message}</p>
          <label htmlForfor= "num">Confirmar </label> 
            <input type="password" placeholder="Confirmar Senha" {...register("conUPASS")} />
            <p>{errors.conUPASS?.message}</p>
          <input type="submit" className='bsub'/>
        </div>

        </form>
        <button onClick={() => props.onFormSwitch("Login")} className='btext'>Já tem uma conta? Clique Aqui!</button>
      </div>
    </div>
      
    </>
  );
};

const FormDados = (props) =>{
  const {user, endereco} = useContext(AppContext)
  var ender;
  if(Object.keys(endereco).length === 0){
    ender = "Não definido"
  }else{
    ender = `${endereco.RUA} , ${endereco.NUM} , N - ${endereco.COMPL} , ${endereco.CIDADE}`
  }
   return (
    <>
      
      <div className='d-flex justify-content-center'>
        <div className='cad_forma'>
          <h1 className='log_title'>Dados</h1>
          <div className='topper'>
            <div>
              <div className='d-flex '>
                  <div className='d-flex struct'><h2>Nome:</h2><h2>{user.UNOME}</h2></div>
              </div>

              <div className='d-flex ecid'>
                  <div className='d-flex struct'><h2>Email:</h2><h2>{user.UEMAIL}</h2></div>
                  <div><button onClick = { props.op1()}className='config'><img src= {images["edit"]} className='icon'/></button></div>
              </div>

              <div className='d-flex'>
                  <div className='d-flex struct'><h2>Fone: </h2> <h2>{user.PHONE}</h2></div>  
              </div> 
            </div>
          </div>
          

          <div className='topper'>
            <div className='d-flex ecid'>
              <div className='d-flex struct'><h2>Endereco:</h2><h2>{ender}</h2></div>
              
              <div><button onClick = {props.op2()}className='config'><img src= {images["edit"]} className='icon'/></button></div>
            </div>
          </div>
        
          <div className='topper'>
            <div className='d-flex ecid'>
              <div className='d-flex struct'><h2>Senha:</h2><h2>********</h2></div> 
              
              <div><button onClick = {props.op3()}className='config'><img src= {images["edit"]} className='icon'/></button></div>
            </div>  
          </div>
        </div>

        
      </div>
     
      
    </>
   )
}

const FormConfig = () => {
  const {Clear} = SwitchOp()
  const { chgUser } = useUserChange()
  const {user, setUser} = useContext(AppContext);
  const schema = yup.object().shape({
    UNOME: yup.string(),
    PHONE: yup.string().matches(/^(\(\d{2}\)\d{5}-\d{4}|\(\d{2}\)\d{4}-\d{4})$/, "Formato inválido de número de telefone").Nu,

  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {

    chgUser(Clear(data))

    alert("Dados atualizados com sucesso!")
  };

  return (
    <>
    <div className='chefe'>
      <div className='cad_forma'>
      <h1 className='log_title'>Dados do Perfil</h1>
        <form onSubmit={handleSubmit(onSubmit)} className=''>
        <div>
          <label htmlForfor= "text">Nome:</label> 
          <input type="text" placeholder="Nome de Usuário" {...register("UNOME")} />
          <p>{errors.UNOME?.message}</p>
        <label htmlForfor= "num">Fone:</label> 
          
          <InputMask
                mask="(99)99999-9999"
                placeholder="Telefone"
                {...register("PHONE")}
              />
          <p>{errors.PHONE?.message}</p>
        </div>
        <div>

          <input type="submit" className='bsub' value={"Salvar"}/>
        </div>

        </form>
      </div>
    </div>
      
    </>
  );  
};

const FormPass = () =>{
  const {Confirmar} = SwitchOp()
  const { chgUser } = useUserChange()
  const {user, setUser} = useContext(AppContext);
  const schema = yup.object().shape({
    UPASS: yup.string().required("Campo Obrigatório"),
    newUPASS: yup.string().min(6, "Senhas devem ter pelo menos 6 caracteres").max(18).required("Campo Obrigatório"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    
    const {success, pass} = await Confirmar(data.UPASS, data.newUPASS)
    
    if(success){
      const obj = {UPASS: pass}
      chgUser(obj)
      alert("Senha Alterada com Sucesso!");
    }else{
      alert("Senha Incorreta");
    }

  };

  return (
    <>
    <div className='chefe'>
      <div className='cad_forma'>
      <h1 className='log_title'>Senhas</h1>
        <form onSubmit={handleSubmit(onSubmit)} className=''>
          <label htmlForfor= "text">Senha:</label> 
            <input type="password" placeholder="Senha" {...register("UPASS")} />
            <p>{errors.UPASS?.message}</p>
          <label htmlForfor= "text">Nova senha: </label> 
            <input type="password" placeholder="Nova Senha" {...register("newUPASS")} />
            <p>{errors.newUPASS?.message}</p>

          <div>

            <input type="submit" className='bsub' value={"Salvar"}/>
          </div>

        </form>
      </div>
    </div>
      
    </>
  );  
}

const FormEnd = () =>{
  const {Clear} = SwitchOp()
  const {chgEnd} = useEndChange()
  const {user, setUser} = useContext(AppContext);
  const schema = yup.object().shape({
    RUA: yup.string().required("Campo Obrigatório"),
    CIDADE: yup.string().required("Campo Obrigatório"),
    COMPL: yup.string(),
    CEP: yup.string().matches(/^\d{5}-\d{3}$/, 'Formato de CEP inválido').required('Campo obrigatório'),
    NUM: yup.number().required('Campo obrigatório'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    
    chgEnd(Clear(data))
    alert("Dados Atualizados!")
  };

  return (
    <>
    <div className='chefe'>
      <div className='cad_forma'>
      <h1 className='log_title'>Endereco</h1>
        <form onSubmit={handleSubmit(onSubmit)} className=''>
          <label htmlForfor= "text">Rua:</label> 
            <input type="text" placeholder="Rua" {...register("RUA")} />
            <p>{errors.RUA?.message}</p>
          <label htmlForfor= "text">CIDADE:</label> 
            <input type="text" placeholder="Cidade" {...register("CIDADE")} />
            <p>{errors.CIDADE?.message}</p>
          <label htmlForfor= "text">COMPL:</label> 
            <input type="text" placeholder="Complemento" {...register("COMPL")} />
            <p>{errors.COMPL?.message}</p>
          <label htmlForfor= "text">CEP:</label> 
          <InputMask
                mask="99999-999"
                placeholder="Digite o CEP"
                {...register("CEP")}
              />
            <p>{errors.CEP?.message}</p>
          <label htmlForfor= "num">NUMERO:</label> 
            <input type="number" placeholder="NUM" {...register("NUM")} />
            <p>{errors.NUM?.message}</p>
          <div>

            <input type="submit" className='bsub' value={"Salvar"}/>
          </div>

        </form>
      </div>
    </div>
      
    </>
  );  
}


export {FormCad, FormLog, FormDados,FormConfig, FormPass, FormEnd};