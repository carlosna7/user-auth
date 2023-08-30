'use client'

import jwt from "jsonwebtoken";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Homelogged = () => {

  // const router = useRouter()
  const [loading, setLoading] = useState(true);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  };

  const isAuthenticated = () => {
    const token = getCookie("token");

    console.log(token)
  
    if (!token) {
      console.log(token)
      return false;
    }
  
    try {
      // Verify the JWT token on the client-side
      const decodedToken = jwt.verify(token, "secret-key-secret");
      console.log(decodedToken)
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    isAuthenticated().then(authenticated => {
      setLoading(false)

      if(!authenticated) {
        // router.push("/login");
        console.log("não autenticado")
      } else {
        console.log("autenticado")
      }
    })
  }, []);

  return (
    <div>
    {loading ? <p>Verificando autenticação...</p> : <p>Parabéns, você está logado!</p>}
  </div>
  )
}

export default Homelogged