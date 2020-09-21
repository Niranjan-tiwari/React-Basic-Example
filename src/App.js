import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Context } from "./store";
import { PublicRoute, PrivateRoute } from "./route";
import "./App.css";

function App() {
  const [state, dispatch] = useContext(Context);
  return (
    <Router>{state.isLoggedIn ? <PrivateRoute /> : <PublicRoute />}</Router>
  );
}

export default App;
