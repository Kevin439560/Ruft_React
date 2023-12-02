import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { useContext , useState} from "react"
import { useVerfi } from "../tools/funcoes"
import images from "../tools/images"
import "../styles/nav_style.css"

export const Navbar = () =>{
    const {user, setUser} = useContext(AppContext)
    const { verificaUser } = useVerfi()

    const swite = () =>{
        
        if(!user || Object.keys(user).length === 0){
            return (
                <Link to = "/login" className="">Entrar</Link>
            )
        }else{
            return(
                <h2 className = "username">{user.UNOME}</h2>
            )
        }

    }

    const Logout = () =>{

        setUser({})
        
    }
    return (
        <nav className="container-fluid navi">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-9 minha-coluna d-flex" id="main">
                    <Link to="/" className="menu">
                        <img src={images["logo"]} alt="logo" className="imagelogo" />
                    </Link>
                </div>  
                
                <div className="col-lg-7 col-md-7 minha-coluna medium-screen-hidden" id="main">
                    {/* Conteúdo da segunda coluna */}
                </div>
    
                <div className="col-lg-2 col-md-2 col-3 minha-coluna d-flex justify-content-between">
                    <Link to="/carrinho" className="btn btn-primary buttonn" role="button">
                    <img src={images["shoppingcart"]} alt="" className="canva" />
                    </Link>
        
                    <button
                    className="button buttonn"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    >
                        <img src={images["menu"]} alt="canva" className="canva" />
                    </button>
                </div>

                
                <div className="offcanvas offcanvas-end offcanvas-bar" data-bs-scroll="true" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

                    <div className="offcanvas-header m-0" data-bs-theme="dark">
                        <img className="user_photo" src={images["user"]} alt ="navBar"/>
                        {swite()}
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
                    </div>

                    
                    <div className="offcanvas-body">

                        <button onClick={() => verificaUser('/perfil')} className="userpage d-flex">
                            
                            <img src={images["userbar"]} alt="Usuário" className="icons_bar"/>
                            <p className="tag_text">Perfil</p>
                        
                        </button>

                        <button onClick={() => verificaUser('/favoritos')} className="userpage d-flex">
                            
                            <img src={images["heart"]} alt="Favoritos" className="icons_bar"/>
                            <p className="tag_text">Favoritos</p>
                            
                        </button>

                        <Link to = "/login" onClick={Logout}>
                            <div className="userpage d-flex">
                                <img src={images["logout"]} alt="Sair" className="icons_bar"/>
                                <p className="tag_text">Sair</p>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
       
    )
}
