import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/LoginPage";
import Taskpage from "./pages/Taskpage";

export const PrivateRoute = () => (
    <Switch>        
        <Route
            exact
            path = "/user"
            component = {Loginpage}
        />        
        <Route
            exact
            path = "/task"
            component = {Taskpage}
        />
        <Route            
            path = "/"
            component = {Homepage}
        />

    </Switch>
)

export const PublicRoute = () => (
    <Switch>
        <Route            
            path = "/"
            component = {Loginpage}
        />        
    </Switch>
)