import { AppContext } from "../App"
import { useContext , useState} from "react"
import {Navback} from './Navback'
import { FormDados, FormConfig, FormPass, FormEnd } from "../tools/Form"

export const Perfil = () =>{

    const {user, endereco} = useContext(AppContext)

    const [conf, setConf] = useState(1)

    const op1 = () =>{
        setConf(2);
    }

    const op2 = () => {
        setConf(3)
    }

    const op3 = () =>{
        setConf(4)
    }
 

    return (
        <main>
            <Navback page = "Perfil"/>

            {conf === 1 ? <FormDados op1 = {() =>op1} op2 = {() =>op2} op3 = {() =>op3}/> : conf === 2 ? <FormConfig/>  : conf === 3 ? <FormEnd/>: <FormPass/>}
            

        </main>
    )
}