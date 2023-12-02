import {useQuery} from "@tanstack/react-query";

import Axios from "axios"

export const useMenu = () =>{
    //muito feio, mas é a unica notacao aceita atualmente, objetos, atributos que podem ser funcoes
    const { data:item, isLoading, error} = useQuery({
        queryKey:[], 
        queryFn:async () => {
            const response = await Axios.get(`http://localhost:3000/api/mostrar?tabela=MENU`);
            return response.data;
    }});
 

    return {item, isLoading, error}
}