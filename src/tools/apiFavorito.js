import { AppContext } from "../App"
import { useContext } from "react"
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

import Axios from "axios"

export const useFavorito = () =>{
    const {user} = useContext(AppContext)
    //muito feio, mas é a unica notacao aceita atualmente, objetos, atributos que podem ser funcoes
    const { data:favoritos, isLoading, error} = useQuery({
        queryKey:["faves"], 
        queryFn:async () => {
            const response = await Axios.get(`http://localhost:3000/api/buscar/favorito?valor=${user.ID}`);
            return response.data;
    }});
 

    return {favoritos, isLoading, error}
};

export const useFavoritoAdd = () =>{

    const queryClient = useQueryClient()

    const {mutateAsync : addFav} = useMutation({
        mutationFn: async (userItem) =>{
                        const response = await Axios.post(`http://localhost:3000/api/inserir/favorito`,{
                        dados: userItem
                        });
                        return response.data;
                    },
        
        onSuccess: () =>{
            queryClient.invalidateQueries(["faves"])
        }
    })

    return{addFav}
};

export const useFavoritoRem = () =>{

    const queryClient = useQueryClient();

    const {mutateAsync : remFav} = useMutation({
        mutationFn : async (userItem) =>{
                        const response = await Axios.delete(`http://localhost:3000/api/remover?tabela=FAVORITO&dados=${JSON.stringify(userItem)}`)
                        return response.data
        },
        onSuccess: () =>{
            queryClient.invalidateQueries(["faves"]);
        }
    })

    return {remFav}

}