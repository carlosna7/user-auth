'use client'
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios";
import * as yup from 'yup';
import { useRouter } from "next/navigation";

import React from 'react'

const Login = () => {

  const router = useRouter();
  
  // capturar valor dos input/Field ao clickar no botão
  // valor interno do Formik (retornado pelo Field)

  const handleClickLogin = (values) => { 
    axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }, {
      withCredentials: true,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response)

      if(response.data.success) {
        router.push("/homelogged")
      }

    }).catch((error) => {
      console.log("Axios error: ", error)
    });
  }

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Não é um e-mail")
      .required(""),
    password: yup
      .string()
      .min(6, "A senha deve ter 6 caracteres")
      .required(""),
  })

  return (
    <div>
      <h1>Login</h1>
      <Formik 
        initialValues={{}}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >

        <Form>

          <div>
            <Field 
              name="email" 
              placeholder="email..."
            />
            <ErrorMessage 
              component="span"
              name="email"
            />
          </div>

          <div>
            <Field 
              name="password" 
              placeholder="senha..."
            />
            <ErrorMessage 
              component="span"
              name="password"
            />
          </div>
          <button type="submit" className="bg-cyan-300 p-1">Login</button>

        </Form>

      </Formik>

    </div>
  )
}

export default Login