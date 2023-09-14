'use client'

import jwt from "jsonwebtoken";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Homelogged = () => {

  // const router = useRouter()

  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`
  //   const parts = value.split(`; ${name}=`)
  //   if (parts.length === 2) {
  //     return parts.pop().split(";").shift()
  //   }
  // }

  const getCookie = (name) => {
    const cookie = {};
    console.log(`Log linha 21 valor do cookie ${cookie}`)
    
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
  
    return cookie[name];
  }

  const isAuthenticated = () => {
    const token = getCookie("token");

    console.log("token")
    console.log(`Log linha 21 valor do token ${{token}}`)
  
    if(!token) {
      console.log("Token invalido ou vazio")
      return false;
    }
  
    try {
      // Verify the JWT token on the client-side
      const decodedToken = jwt.decode(token);
      console.log(`valor decodedToken ${decodedToken}`)
      const valor = decodedToken.email.split("@")[0];   
      console.log(`valor decodedToken com split no @ ${valor}`)   

      // if(valor !== "teste" ) {
      //   return true;
      // }

      return true;
    } catch (error) {
      console.log("Erro na descriptografação")
      return false;
    }
  }

  useEffect(() => {
      if(!isAuthenticated()) {
        // router.push("/login");
        console.log("não autenticado")
      } else {
        console.log("autenticado")
      }
  }, []);

  return (
    <div>
      <p>Parabéns, você está logado!</p>
  </div>
  )
}

export default Homelogged