import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { useContext } from "react"
import images from "../tools/images"
import "../styles/nav_style.css"

export const Navback = (props) =>{
    const {user} = useContext(AppContext)
    return (
        <nav className="container-fluid navi">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-9 minha-coluna d-flex" id="main">
                    <Link to="/" className="menu">
                        <img src={images["logo"]} alt="logo" className="imagelogo" />
                    </Link>
                </div>  
        
                <div className="col-lg-7 col-md-7 minha-coluna medium-screen-hidden" id="main">
                    <h1 className="tiles">{props.page}</h1>
                </div>
    
                <div className="col-lg-2 col-md-2 col-3 minha-coluna d-flex justify-content-center">
      
                    <Link to="/" className="menu">
                        <img src={images["backred"]} alt="logo" className="beke" />
                    </Link>
  
                </div>

                
               
            </div>
        </nav>
       
    )
}
