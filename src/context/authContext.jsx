'use client'

import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)

  useEffect(() => {

    // const router = useRouter()

    const cookies = Cookies.get('tokenLogin')
    console.log(cookies)
	
    const verifyToken = async () => {

      try {
        const response = await axios.post("http://localhost:3001/verifyuser", {
          token: cookies
        })

        if(response.data.success === true) {
          console.log("true verdade")
          setAuth(true)
        } else {
          console.log("false falso")
          setAuth(false)

          // router.push("/login")
        }
      } catch (error) {
        console.log("Erro ao verificar token:", error)
      }
    }

    verifyToken()
  }, [])

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }
