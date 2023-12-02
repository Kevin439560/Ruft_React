import images from "../tools/images"
import { useContext , useState, forwardRef, useEffect} from "react"
import { useNavigate } from "react-router-dom"

import { useFavorito, useFavoritoAdd, useFavoritoRem } from "./apiFavorito"
import { AppContext } from "../App"

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export const Dives = (props) =>{
  const { Click , add } = useMethods(props)
    return (
      <main>
        <div key={props.id} className="row all" id={props.id}>
          
          <div className="col-7 col-md-4 offset-md-2 itemg">
            <img src = {props.image} className='menu_images' alt="Comida"/>
          </div>
          
          <div className="col-md-5 col-5 menu_item">

            <div> <p className="title">{props.nome}</p> </div>
            
            <div> <p>{props.desc}</p> <h2 className="text">R$ {props.preco}</h2></div>
              
            <div className='d-flex justify-content-center'>
                <Feedback type ="success" page = "menu_botao" pic ={images["shoppingcartwhite"]} alt = "Adicionar ao Carrinho" 
                itemid = {props.ID} text ="Item adicionado ao Carrinho!" func = {add}/>

                <Feedback type ="success" page = "menu_botao" pic ={images["favheart"]} alt = "Remover" 
                itemid = {props.ID} item = {props.item} text ="Item Adicionado aos Favoritos!" func = {Click}/>
            </div>
            
          </div>
      
      
        </div>
      </main>
    )
}

export const Favs = (props) =>{
  const { Click , add } = useMethods(props)
  return(
    <main>
          <div key={props.id} className="row all" id={props.id}>
            
            <div className="col-7 col-md-4 offset-md-2 itemg">
              <img src = {props.image} className='menu_images' alt="Comida"/>
            </div>
            
            <div className="col-md-5 col-5 menu_item">
    
              <div> <p className="title">{props.nome}</p> </div>
              
              <div> <p>{props.desc}</p> </div>
                
              <div className='d-flex justify-content-center'>

                <Feedback type ="success" page = "menu_botao" pic ={images["shoppingcartwhite"]} alt = "Adicionar ao Carrinho" 
                itemid = {props.ID} text ="Item adicionado ao Carrinho!" func = {add}/>
                
                <Feedback type ="info" page = "close" pic ={images["close"]} alt = "Remover" 
                itemid = {props.ID} item = {props.item} text ="Item Removido dos Favoritos!" func = {Click}/>
              
              </div>
              
            </div>
        
        
          </div>
    </main>
  )
}

export const Orders = (props) =>{
  const { quantt } = useContext(AppContext)
  return(
    <main>
          <div key={props.id} className="row all" id={props.id}>
            
            <div className="col-7 col-md-4 offset-md-2 itemg">
              <img src = {props.image} className='menu_images' alt="Comida"/>
            </div>
            
            <div className="col-md-5 col-5 menu_item">
    
              <div> <h2 className="title">{props.nome}</h2> </div>
              
              <div> <h6>{props.desc}</h6> </div>
               
              <div>

                <h6>Quantidade: {(quantt[props.ID])}</h6>
              
                <h6>Valor: {(props.preco)}</h6>

              </div>
              
            </div>
        
          </div>
    </main>
  )
}

export const Total = () =>{
  const { quantt } = useContext(AppContext)//dicionario que pega o id de cada item e sua quantidade no carrinho
  const calTotal = (aitens) =>{
    const chaves = Object.keys(aitens);
    let Total = 0;
    chaves.forEach(key => {
      Total += aitens[key] * quantt[key]
    });
    Total = Number(Total.toFixed(2))
    return Total;
  }

  return { calTotal }
}

export const Carts = (props) =>{

  const { quantt } = useContext(AppContext)
  const { rem } = useMethods(props)
  const { Quantt } = useQuantt();
  return(
    <main>
          <div key={props.id} className="row all" id={props.id}>
            
            <div className="col-7 col-md-4 offset-md-2 itemg">
              <img src = {props.image} className='menu_images' alt="Comida"/>
            </div>
            
            <div className="col-md-5 col-5 ">
    
              <div> <p className="title">{props.nome}</p> </div>
              
              <div> <p>{props.desc}</p> </div>
              <div>
                
                <button onClick={() => Quantt(props.ID, 0)} className="setValue">-</button>
                  {(quantt[props.ID])}
                <button onClick={() => Quantt(props.ID, 1)} className="setValue" id="liveToastBtn">+</button>
                
              </div>
                
              <div className='d-flex justify-content-center'>
                
                
                <Feedback type ="info" page = "close" pic ={images["close"]} alt = "Remover" 
                text ="Item removido do Carrinho!" func = {rem}/>
  

              </div>
              
            </div>
        
          </div>
    </main>
  )
}

export const Homes = (props) =>{
  const { Click , add } = useMethods(props)
  return (
    <div className=" d-flex carrossel">
      <img src={images[props.IMAGEM]} className="d-block w-100 carousel_images" alt="..."/>
      <div className="expandir">
          <div className="row data tinfo">
              <h3 className="title">{props.NOME}</h3>
          </div>
          <div className="row data dinfo">
              <p className="desc">{props.DESCRICAO}</p>
              <h2 className="text">R$ {props.VALOR}</h2> 
          </div>
          <div className=" data">
            <div className='d-flex'>

              <Feedback type ="success" page = "menu_botao" pic ={images["shoppingcartwhite"]} alt = "Adicionar ao Carrinho" 
              itemid = {props.ID} text ="Item adicionado ao Carrinho!" func = {add}/>

              <Feedback type = "success" page = "menu_botao" pic ={images["favheart"]} alt = "Remover" 
              itemid = {props.ID} item = {props.item} text = "Item Adicionado aos Favoritos!" func = {Click}/>

            </div>
          </div>
          
      </div>
          
  </div>
  )
}

export const useAltFav = () =>{
  const {favoritos, error} = useFavorito()  
  const remFavorito = useFavoritoRem();
  const addFavorito = useFavoritoAdd();

  const alternarFavorito = (userItem) =>{

    const index = favoritos.findIndex((favorito) => favorito.UID === userItem.UID && favorito.ITEMID === userItem.ITEMID);
    
    const ade = async () =>{
      try{
        await addFavorito.addFav(userItem);
        console.log("Item adicionado com sucesso")
      }catch(error){
        console.error("Error ao adicionar o item!", error)
      }
    }
    const remo = async () =>{
      try{
        await remFavorito.remFav(userItem);
        console.log("Item removido com sucesso!")
      }catch(error){
        console.error("Erro ao remover o item!", error)
      }
    }
    if(index !== -1){
      remo()
    }else{
      ade()
    }
  }
  if (error) {
    return <p>Ocorreu um erro: {error.message}</p>;
  }

  return {alternarFavorito};
}

export const useQuantt = () =>{
  //pega as quantidades de cada item no carrinho
  const {quantt, setQuantt, setCarrinho} = useContext(AppContext)
  //funcao para alterar a quantidade
  const Quantt = (Id, operator) => {
    switch (operator) {
      case 1:
        //se o operador é 1 vai adicionar quantidade
        setQuantt((prevQuantt) => ({
          ...prevQuantt,
          [Id]: (prevQuantt[Id] || 0) + 1,
        }));
        break;

        //se é zero vai decrementar
      case 0:
        const newQuantt = {...quantt}
        if (newQuantt[Id] === 1) {
          delete newQuantt[Id];
          setQuantt(newQuantt);
          setCarrinho((prevCarrinho) =>{
            const newCarrinho = prevCarrinho.filter(item => item.ID !== Id)
            return newCarrinho
          })
          //se nao, vai diminuir em 1
        } else if (newQuantt[Id] > 1) {
          newQuantt[Id] -= 1;
          setQuantt(newQuantt)
        }
        
        break;
      case 2:
        setQuantt((prevQuantt) =>{
          const newQuantt = {...prevQuantt};
          delete newQuantt[Id];
          return newQuantt;
        })
        setCarrinho((prevCarrinho) =>{
          const newCarrinho = prevCarrinho.filter(item => item.ID !== Id)
          return newCarrinho;
        })
        break;
        
      default:
        throw new Error(`Operador desconhecido: ${operator}`);
    }
  };

  return { Quantt };
};

export const useVerfi = () =>{
  const navigate = useNavigate();
  const {user} = useContext(AppContext)
  const verificaUser = (page) =>{
    if(!user || Object.keys(user).length === 0){

      alert("Voce precisa fazer Login antes disso!")

      navigate('/login')
      
    }else{
      navigate(page)
    }
  }

  return { verificaUser }
}

export const useMethods = (props) =>{

  //props ID, itemid, item
  const navigate = useNavigate();
  const { Quantt } = useQuantt();
  const {user, setCarrinho} = useContext(AppContext)
  const {alternarFavorito} = useAltFav();
  const itemId = props.ID;
  const userItem = {
      UID: user.ID,
      ITEMID: itemId
    }
  const Click = () =>{
    if(!user || Object.keys(user).length === 0){
      alert("Voce precisa fazer Login antes disso!")
      navigate('/login')
    }else{
      alternarFavorito(userItem)
    }
    
  }

  const add = () => {

    //vai atualizar o carrinho
    setCarrinho((prevCarrinho) => {
      if (!prevCarrinho.some((item) => item.ID === itemId)) {
        return [...prevCarrinho, props.item];
      }
      return prevCarrinho;
    });
      
    Quantt(itemId, 1);
  
  };

  const rem =()=>{
    Quantt(itemId, 2)
  }



    
  return {Click, add, rem}
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Feedback = (props) => {
  const [open, setOpen] = useState(false);

  //props: type(sucess, warning), page(close ou menu_botao), alt(texto alternativo pra img)
  //text: texto do aviso, 
  
  const handleClick = async()  => {
    
    setOpen(true);
    
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      // Aqui você pode adicionar lógica adicional para exibir a notificação
      // Pode ser uma chamada para uma biblioteca de notificação, etc.
      console.log('Notificação exibida!');
      props.func();
    }
  }, [open]);
  return (
    <Stack>
    
      <Button variant="outlined" onClick={() => { handleClick();  }} className={`botao ${props.page}`}>
        <img src = {props.pic} className="icon_buy" alt ={props.alt}/>{props.M}
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.type} sx={{ width: '100%' }}>
          {props.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}