import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "bootstrap/dist/css/bootstrap.min.css"; // importacion para trabajar con bootstrap
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; // importaciones apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000/api",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "150px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
