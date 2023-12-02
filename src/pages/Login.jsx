import { AppContext } from "../App"
import { useContext, useState } from "react"

import "../styles/login_style.css"
import { FormCad, FormLog } from "../tools/Form";

export const Login =() =>{
    const {user, setUser} = useContext(AppContext);
    const [form, setForm] = useState("Login")
    const toggleForm = (name) =>{
        setForm(name)
    }

    return(


        <div className="container-fluid bg">
            
           {form === "Login" ? <FormLog onFormSwitch = {toggleForm}/> : <FormCad onFormSwitch = {toggleForm}/>}
         
        </div>
        
    )
}