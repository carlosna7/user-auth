'use client'

import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios";
import * as yup from 'yup';
import { useRouter } from "next/navigation";

import React from 'react'

const Register = () => {

  const router = useRouter()
  
  // capturar valor dos input/Field ao clickar no botão
  // valor interno do Formik (retornado pelo Field)

  const handleClickRegister = (values) => { 
    // https://user-auth-server-carlosna7.vercel.app/register
    // http://localhost:3001/register
    axios.post("http://localhost:3001/register", { 
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response)

      if(response.data.success) {
        router.push("/login")
      }

    }).catch((error) => {
      console.log("Axios error: ", error)
    });
  }

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Não é um e-mail")
      .required(""),
    password: yup
      .string()
      .min(6, "A senha deve ter 6 caracteres")
      .required(""),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "As senha não são iguais")
        .required(""),
  })

  return (
    <div>

      <h1>Registro</h1>
      <Formik 
        initialValues={{}}
        onSubmit={handleClickRegister}
        validationSchema={validationRegister}
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

          <div>
            <Field 
              name="confirmPassword" 
              placeholder="confirme sua senha..."
            />
            <ErrorMessage 
              component="span"
              name="confirmPassword"
            />
          </div>
          <button type="submit" className="bg-cyan-300 p-1">register</button>

        </Form>

      </Formik>
    </div>
  )
}

export default Register