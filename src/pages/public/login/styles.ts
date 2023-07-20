import styled from "styled-components";
import { Field, Form } from "formik";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(0, 132, 255, 1) 0%,
    rgba(2, 158, 255, 1) 50%,
    rgba(0, 212, 255, 1) 100%
  );
`;

export const FormContent = styled.div`
  padding-left: 12%;
  padding-right: 12%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h3`
  text-align: center;
  margin-bottom: 1em;
  font-size: 24px;
  color: rgb(34, 34, 34);
  font-weight: 800;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
  padding-top: 30px;
  padding-bottom: 20px;
  border-radius: 8px;
  background-color: white;
`;

export const StyledField = styled(Field)`
  align-items: center;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem 0.75rem;

  &:focus,
  &:active {
    box-shadow: rgb(210, 213, 217) 0px 0px 2px 1px,
      rgb(227, 230, 232) 0px 0px 0px 3px;
    border: 1px solid rgb(26, 33, 43);
    outline: none;
  }

  /* Autocomplete styles in Chrome*/
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 0 0 0px 1000px #fff inset;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: black;
  }
`;

export const ButtonCss = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid cyan;
  color: #000;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  &:hover {
    color: #fff;

    background: linear-gradient(
      270deg,
      rgba(0, 212, 255, 1) 0%,
      rgba(0, 132, 255, 1) 20%,
      rgba(0, 212, 255, 1) 100%
    );
  }
`;
