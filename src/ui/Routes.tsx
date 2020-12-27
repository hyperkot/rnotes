import React from "react";

import { Route, Switch, Redirect } from 'react-router';
import { useSelector } from "react-redux";

import { NotesPage } from "./pages/NotesPage";
import { LoginPage } from "./pages/LoginPage";

import { AuthModule } from "modules";

import { routes } from "routes";
import { LicensesPage } from "./pages/LicensesPage/LicensesPage";

function PrivateRoute({ children, ...rest }: any) {
    const isAuthorized = useSelector(AuthModule.selectIsAuthorized);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthorized ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: routes.login.path,
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export const Routes = () => {
    const isAuthorized = useSelector(AuthModule.selectIsAuthorized);
    return (<Switch>
        <Route
            exact
            path="/"
            render={({ location }) => isAuthorized
                ? <Redirect to={{
                    pathname: routes.notes.path,
                    state: { from: location }
                }} />
                : <Redirect to={{
                    pathname: routes.login.path,
                    state: { from: location }
                }} />
            }
        />
        <Route path={routes.login.path}>
            <LoginPage />
        </Route>
        <PrivateRoute path={routes.notes.path}>
            <NotesPage />
        </PrivateRoute>
        <Route path={routes.licenses.path}>
            <LicensesPage />
        </Route>
    </Switch>);
};



