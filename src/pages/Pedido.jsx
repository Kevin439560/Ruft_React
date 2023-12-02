import { Orders, Total} from "../tools/funcoes"
import { AppContext } from "../App"
import { useContext } from "react"
import { Navback } from "./Navback"
import { usePedido } from "../tools/apiPedido"
import images from "../tools/images"

export const Pedido = () =>{
    const {carrinho,  endereco} = useContext(AppContext)
    const {fimPedido} = usePedido()
    const Endereco = () =>{
        if(!endereco || Object.keys(endereco).length === 0){
            return ""
        }else{
            return `Endereço: Rua ${endereco.RUA}, N ${endereco.NUM}, ${endereco.CIDADE}`
        }

    }   
    const {calTotal} = Total()
    const aitens = {}
    return (
        <main>
            <Navback page = "Pedido"/>
            <div className="container-fluid">
                <div id = "carts">
                    <h1>Itens</h1>
                    {carrinho.map((item, index) => (
                        aitens[item.ID] = item.VALOR,
                        <Orders id = {index} ID = {item.ID} image = {images[item.IMAGEM]} nome = {item.NOME} desc = {item.DESCRICAO} preco = {item.VALOR} item = {item}/>
                    ))}
                </div>
                <div className="orderBase">
                    <h3>{Endereco}</h3>
                    <h1>Total: R$ {calTotal(aitens)}</h1>
                    <button className="pew menu_botao" onClick={() => fimPedido(calTotal(aitens))}>Finalizar Pedido</button>
                    
                </div>
                
            </div>
        </main>
    )
}