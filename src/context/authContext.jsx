'use client'

import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
	
    const verifyToken = async () => {

      console.log("Funcionando Eduardo")

      try {
        const response = await axios.get("http://localhost:3001/verifyuser")

        console.log("Funcionando Eduardo")

        if (response.data.success) {
          setAuth(true)
        } else {
          setAuth(false)
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
