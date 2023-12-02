import { Navback } from './Navback'
import { useFavorito } from "../tools/apiFavorito"
import { Favs } from "../tools/funcoes"
import images from "../tools/images"


export const Favorito = () =>{
    const {favoritos, isLoading, error} = useFavorito()

    if (isLoading) {
      return <p>Carregando...</p>;
    }
  
    if (error) {
        return <p>Ocorreu um erro: {error.message}</p>;
    }
    return (
        
        <main>
            <Navback page = "Favoritos"/>
            <div className="container-fluid">
                <div id = "favorites">
                    {favoritos.map((item, index) => (
                        <Favs id = {index} ID = {item.ID} image = {images[item.IMAGEM]} nome = {item.NOME} desc = {item.DESCRICAO} preco = {item.VALOR} item = {item}/>
                    ))}
                </div>
            </div>
        </main>
    )
}