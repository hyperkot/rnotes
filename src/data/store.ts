import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'

import { Registry } from "./modules/registry";
import { AuthModule } from "./modules/auth";
import { LoginUIModule } from "./modules/ui/login";
import { NotesModule } from "./modules/notes";

Registry.registerModule(LoginUIModule);
Registry.registerModule(AuthModule);
Registry.registerModule(NotesModule);
Registry.lock();

export const history = createBrowserHistory();

const rootReducer = Registry.getCombinedReducer(history);

const initialState = Registry.getCombinedInitialState();

export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(routerMiddleware(history), thunk)
    )
);