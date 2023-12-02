
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../App";
import Axios from "axios"


export const usePedidoOp = () =>{

    const queryClient = useQueryClient();

    const {mutateAsync : addOrder} = useMutation({
        mutationFn: async (info) =>{
            const response = await Axios.post(`http://localhost:3000/api/inserir`,{
                tabela:"PEDIDO",
                dados: info
            });
            return response.data;
        },
        
  
    })


    return{addOrder}
};

export const usePedido = () =>{
    const {addOrder} = usePedidoOp()
    const {user} = useContext(AppContext)
    const fimPedido = async (total) =>{
        const info = {
            UID:user.ID,
            VALOR: total
        }
        const result = await addOrder(info)
        alert("Pedido Realizado Com Sucesso!")
        return result
    }

    return { fimPedido }
}
