import {Navback} from './Navback'
import images from "../tools/images"
import { useMenu } from "../tools/apiMenu"
import {Dives} from "../tools/funcoes"
import "../styles/home_style.css"
import "../styles/nav_style.css"

export const Menu = () =>{
    const {item, isLoading, error} = useMenu()
    if (isLoading) {
      return <p>Carregando...</p>;
    }
  
    if (error) {
        return <p>Ocorreu um erro: {error.message}</p>;
    }
    const pasteis = item.filter(lanche => lanche.CATEGORIA === 'Pastel')
    const hambs = item.filter(lanche => lanche.CATEGORIA === 'Hamburguer')
    const bebidas = item.filter(lanche => lanche.CATEGORIA === 'Bebida')
   
    return (
      <div>
        <Navback page = "Menu"/>
        <div className="container-fluid">
          <div id = "pasteis">
            {pasteis.map((item, index) => (
            <Dives id = {index} ID = {item.ID}image = {images[item.IMAGEM]} nome = {item.NOME} desc = {item.DESCRICAO} preco = {item.VALOR} item = {item}/>
            ))}
          </div>
          <div id = "hamburgueres">
            {hambs.map((item, index) => (
            <Dives id = {index} ID = {item.ID}image = {images[item.IMAGEM]} nome = {item.NOME} desc = {item.DESCRICAO} preco = {item.VALOR} item = {item}/>
            ))}
          </div>
          <div id = "bebidas">
            {bebidas.map((item, index) => (
            <Dives id = {index} ID = {item.ID}image = {images[item.IMAGEM]} nome = {item.NOME} desc = {item.DESCRICAO} preco = {item.VALOR} item = {item}/>
            ))}
          </div>
         
          
        </div>
        <footer className="container-fluid">

          <div className="row buxa">
              
          </div>
          <div className="row end_bar">
              <div className="col-12 copyright">
                  Copyright &copy;Todos os direitos reservados a RuFT Alimentos Inc.
              </div>
          </div>
        </footer>

      </div>
      
    );
}