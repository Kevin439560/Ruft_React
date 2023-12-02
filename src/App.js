import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import React, { useState, createContext } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"
import {Menu} from "./pages/Menu"
import { Perfil } from "./pages/Perfil"
import { Favorito } from "./pages/Favoritos"
import { Carrinho } from "./pages/Carrinho"
import { Pedido } from "./pages/Pedido"
import './App.css';

export const AppContext = createContext();


function App() {
  const defau = {
    ID: 1,
    UNOME: "Kevin de Freitas",
    UEMAIL: "Kevin@gmail.com",
    PHONE: 6217681726,
    ENDID: 2
  }
  const defo = [
    {ID:19, NOME: "X-Bacon",  VALOR:6.99, IMAGEM: "X_BACON", DESCRICAO:"Hamburguer com Carne e Bacon", CATEGORIA : "Hamburguer"},
    {ID:7, NOME: "Pastel Frango com Catupiry M", VALOR:5.99, IMAGEM :"P_FRANGO_CAT", DESCRICAO: "Pastel de Frango com Catupiry", CATEGORIA : "Pastel"},

  ]

  const [user, setUser] = useState({});
  const [promo, setPromo] = useState(defo);
  const [carrinho, setCarrinho] = useState([]);
  const [quantt, setQuantt] = useState({});
  const [endereco, setEndereco] = useState({});

  const client = new QueryClient();
  return (
    <div className="App">
      
      <AppContext.Provider value = {{user,setUser, promo, carrinho, setCarrinho, quantt, setQuantt, endereco, setEndereco}}>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path = "/" element={<Home/>}/>
              <Route path = "/menu" element={<Menu/>}/>
              <Route path = "/perfil" element={<Perfil/>}/>
              <Route path = "/favoritos" element={<Favorito/>}/>
              <Route path = "/login" element={<Login/>}/>
              <Route path = "/carrinho" element={<Carrinho/>}/>
              <Route path = "/pedido" element={<Pedido/>}/>
              <Route path = "*" element={<Navigate to="/" />}/>
            </Routes>
          </Router>
        </QueryClientProvider>
      </AppContext.Provider>
    </div>
  );
}


export default App;
