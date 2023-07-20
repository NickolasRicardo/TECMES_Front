import { createGlobalStyle } from "styled-components";

// import RobotoRegular from '../assets/fonts/Roboto/Roboto-Regular.ttf';
/* @font-face {
    font-family: 'Roboto-Regular';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoRegular});
  } */

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  #root{
    height: 100vh;
  }

  body{
    background: #fff !important;
    color:#666;
    /* -webkit-font-smoothing: antialiased; */
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
  }

  body, input, button{
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }



  button{
    cursor: pointer;
  }


h1{
  font-family: 'Roboto', sans-serif;
}

  .makeStyles-margin-2 {
    margin: 0 !important;
    margin-top: 12px !important;
    margin-bottom: 12px !important;
  }

/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #c7c7c7;
  border-radius: 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c7c7c7;
  border-radius: 0px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #c7c7c7;
}

`;
