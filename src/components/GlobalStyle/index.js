import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: #fafafa;
    
  font-family: "Libre Baskerville", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  // * {
  //   background: #000 !important;
  //   color: #0f0 !important;
  //   outline: solid #f00 1px !important;
  // }
`;

export default GlobalStyle;
