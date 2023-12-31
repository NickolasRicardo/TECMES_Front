import styled from "styled-components";
import { Field, Form } from "formik";

export const Container = styled.div`
  display: flex;
  flex: 1;
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

export const StyledForm = styled(Form)``;

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
  background: #1677ff;
  border-radius: 3px;
  border: 2px solid #1677ff;
  color: #fff;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  &:hover {
    color: #fff;

    border: 2px solid rgba(0, 212, 255, 1);
    background: rgba(0, 212, 255, 1);
  }
`;
