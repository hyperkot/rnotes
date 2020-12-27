import * as React from "react";

import { Provider } from "react-redux";
import { store, history } from "../data/store";
import { ConnectedRouter } from 'connected-react-router'

import { Routes } from "./Routes";

(window as any).store = store;

export const App = () =>
    (<Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes />
        </ConnectedRouter>
    </Provider>);