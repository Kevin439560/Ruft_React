import {Navbar} from "./Navbar"
import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { useContext } from "react"
import { Homes} from "../tools/funcoes"
import images from "../tools/images"
import "../styles/home_style.css"


export const Home = () =>{
    const {promo} = useContext(AppContext)
    return (
        
        <div>
            <Navbar/>
            <main>
                <section className="categorias container">
                    <div className="row">
                        <div className="col cat_title"><h1 className="topic">Uma diversidade de opções!</h1></div>
                    </div>
                    <div className="row images">
                        <div className="col-3 d-flex justify-content-center"><Link to = "/menu#hamburgueres"><img src={images["X_BACON"]} alt="" className="cat_icon"/></Link></div>
                        <div className="col-3 d-flex justify-content-center"><Link to = "/menu#pasteis"><img src={images["pasteis"]} alt="" className="cat_icon"/></Link></div>
                        <div className="col-3 d-flex justify-content-center"><Link to = "/menu#bebidas"><img src={images["bebidas"]} alt="" className="cat_icon"/></Link></div>
                        <div className="col-3 d-flex justify-content-center"><Link to = "/menu"><img src={images["X_BACON"]} alt="" className="cat_icon"/></Link></div>
                    </div>
                    <div className="row">
                        <div className="col-3 d-flex justify-content-center"><Link to = "/menu#hamburguers" className = "linke"href=""><h6 className="">Hambúrguers</h6></Link></div>
                        <div className="col-3 d-flex justify-content-center"><Link to = "/menu#pasteis" className = "linke"href=""><h6 className="">Pastéis</h6></Link></div>
                        <div className="col-3 d-flex justify-content-center"><Link to = "/menu#bebidas" className = "linke"href=""><h6 className="">Bebidas</h6></Link></div>
                        <div className="col-3 d-flex justify-content-center"><Link to = "/menu" className = "linke"href=""><h6 className="">Menu</h6></Link></div>
                    </div>
                </section>

                <section className="carousel container">

                    <div className="row">
                        <div className="col cat_title"><h1 className="topic">Ofertas</h1></div>
                    </div>

                    <div className="carogan">
                        <div id="carouselExample" className="carousel slide ">
                            <div className="carousel-inner">
                                
                                {promo.map((item, index)=>{
                                    
                                    return(
                                    <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                        <Homes IMAGEM = {item.IMAGEM} NOME = {item.NOME} DESCRICAO = {item.DESCRICAO} VALOR = {item.VALOR} ID = {item.ID} item = {item}/>
                                            
                                    </div>
                                    )
                                
                                
                    
                                })}
     
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                </section>
            </main>

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
    )
}