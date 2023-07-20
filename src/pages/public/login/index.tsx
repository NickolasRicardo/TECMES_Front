import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../../hook/authenticator";
import {
  ButtonCss,
  StyledField as Field,
  StyledForm as Form,
  Container,
  FormContent,
  FormTitle,
} from "./styles";

// VALIDATION
const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Usuário muito curto!")
    .max(50, "Usuário muito longo!")
    .required("Obrigatório"),
  password: Yup.string()
    .min(2, "Senha muito curta!")
    .max(50, "Senha muito longa!")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "A senha deverá conter 8 characters, um em caixa alta, um numero and um caracter especial"
    )
    .required("Obrigatório"),
});

// HTML PAGE
function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async (values: any) => {
    setError(false);
    setLoading(true);
    const { username, password } = values;

    try {
      await signIn({ username: username, password: password });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            handleSignIn(values);
          }}
        >
          {({ errors, touched, isValid }) => (
            <Form className="Auth-form">
              <FormContent>
                <FormTitle>Acesso ao sistema</FormTitle>
                <Field name="username" placeholder="Username" />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
                <br />
                <Field name="password" placeholder="Password" type="password" />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <br />
                <ButtonCss type="submit" disabled={!isValid}>
                  {loading ? "carregando..." : "Entrar"}
                </ButtonCss>
                <br />
                {error && (
                  <p style={{ color: "red" }}> Usuário ou senha invalidas </p>
                )}
              </FormContent>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export { LoginPage };
