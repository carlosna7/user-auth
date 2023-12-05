'use client'

import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
	
    const verifyToken = async () => {

      try {
        const response = await axios.post("http://localhost:3001/verifyuser")

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
