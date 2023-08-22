'use client'
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios";
import * as yup from 'yup';
export default function Home() {

  // capturar valor dos input/Field ao clickar no botão
  // valor interno do Formik (retornado pelo Field)
  const handleClickLogin = (values) => { 
    axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response)
    });
  }

  const handleClickRegister = (values) => { 
    axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response)
    })
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

      {/* ------------------------------------------------------------------ */}

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
