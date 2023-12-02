import { Carts , useQuantt} from "../tools/funcoes"
import { AppContext } from "../App"
import { useContext } from "react"
import { Navback } from "./Navback"
import images from "../tools/images"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Carrinho = () =>{
    const {carrinho, quantt, setQuantt} = useContext(AppContext)
    
    return (
        <main>
            <Navback page = "Carrinho"/>
            <div className="container-fluid">
                <div id = "carts">
                    {carrinho.map((item, index) => (
                        <Carts id = {index} ID = {item.ID} image = {images[item.IMAGEM]} nome = {item.NOME} desc = {item.DESCRICAO} preco = {item.VALOR} item = {item}/>
                    ))}
                </div>
                <Link to ="/pedido"><button className="pew menu_botao">Ir para Pedido</button></Link>
            </div>
        </main>
    )
}