import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import App from "./App";
import { globalStyle } from "./styles";
const GlobalStyle = createGlobalStyle`${globalStyle}`;
import { BrowserRouter } from "react-router-dom";

declare global {
  // tslint:disable-next-line
  interface Window {
    blockies: any;
    electronApi: any;
  }
}

ReactDOM.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
  document.getElementById("root"),
);
