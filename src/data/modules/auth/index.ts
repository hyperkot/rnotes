

import { User } from "../../types/User";
import { createSelector } from "reselect";
import { Reducer, AnyAction, Dispatch } from "redux";
import api from "../api";
import { AxiosResponse } from "axios";

import { push } from "connected-react-router";
import { routes } from "routes";


export namespace AuthModule {
    export const moduleName = "auth";

    // State
    export interface State {
        user?: User;
        error?: string;
        loading: boolean;
    }

    export const initState = () => ({
        user: null,
        error: null,
        loading: false
    }) as State;

    // Actions
    export const startLoadingActionName = moduleName + "/startLoading";
    export const startLoadingAction = () => ({ type: startLoadingActionName });

    export const stopLoadingActionName = moduleName + "/stopLoading";
    export const stopLoadingAction = () => ({ type: stopLoadingActionName });

    export const setErrorActionName = moduleName + "/setError";
    export const setErrorAction = (error: string) => ({ type: setErrorActionName, error });

    export const setUserActionName = moduleName + "/setUser";
    export const setUserAction = (user: User) => ({ type: setUserActionName, user });

    export const logoutAction = () => setUserAction(null);

    const defaultResultHandler = (dispatch: Dispatch, result: AxiosResponse<User | { error: string }>) => {
        if ("error" in result.data) {
            dispatch(setErrorAction(result.data.error));
        } else {
            dispatch(setUserAction(result.data));
            dispatch(push(routes.notes.path));
        }
    }

    // Thunks
    export const loginActionName = moduleName + "/login";
    export const loginAction = (name: string, password: string) => {
        return (dispatch: Dispatch) => {
            dispatch(startLoadingAction());
            return api.post("/user/login", { name, password })
                .then(result => defaultResultHandler(dispatch, result))
                .catch(error => {
                    dispatch(setErrorAction(error?.message || String(error)));
                }).finally(() => dispatch(stopLoadingAction()));;
        }
    };

    export const registerActionName = moduleName + "/register";
    export const registerAction = (name: string, password: string) => {
        return (dispatch: Dispatch) => {
            dispatch(startLoadingAction());
            return api.post("/user/register", { name, password })
                .then(result => defaultResultHandler(dispatch, result))
                .catch(error => {
                    dispatch(setErrorAction(error?.message || String(error)));
                }).finally(() => dispatch(stopLoadingAction()));
        }
    };

    // Reducer
    export const reducer: Reducer = (state: State = initState(), action: AnyAction) => {
        switch (action.type) {
            case startLoadingActionName:
                return {
                    ...state,
                    loading: true
                };
            case stopLoadingActionName:
                return {
                    ...state,
                    loading: false
                };
            case setErrorActionName:
                return {
                    ...state,
                    error: action.error
                };
            case setUserActionName:
                return {
                    ...state,
                    user: action.user,
                    error: null
                };
            default:
                return state;
        }
    }

    export const selectModule = (state: any) => state[moduleName];

    export const selectIsAnonymous = createSelector(selectModule, (state: State) => !state.user);
    export const selectIsAuthorized = createSelector(selectModule, (state: State) => !!state.user);
    export const selectIsLoading = createSelector(selectModule, (state: State) => state.loading);
    export const selectError = createSelector(selectModule, (state: State) => state.error);

    export const selectUserName = createSelector(selectModule, (state: State) => state.user ? state.user.name : "Anonymous");
}

export default AuthModule;