import { createSelector } from "reselect";
import { Reducer, AnyAction, Dispatch } from "redux";
import { AxiosResponse } from "axios";

import { User } from "types";
import api from "modules/api";

import { AuthModule } from "../auth";
/*
    Этот модуль немного кривой тк данные хранятся все в юзере сейчас, то есть в auth
*/
export namespace NotesModule {
    export const moduleName = "notes";

    // State
    export interface State {
        error?: string;
        loading: boolean;
    }

    export const initState = () => ({
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

    const handleRequest = (request: Promise<AxiosResponse<any>>, dispatch: Dispatch) => {
        dispatch(startLoadingAction());
        return request
            .then((result: AxiosResponse<User | { error: string }>) => {
                if ("error" in result.data) {
                    dispatch(setErrorAction(result.data.error));
                } else {
                    dispatch(AuthModule.setUserAction(result.data));
                }
            })
            .catch(error => {
                dispatch(setErrorAction(error?.message || String(error)));
            })
            .finally(() => { dispatch(stopLoadingAction()); });
        }

    // Thunks
    export const addNoteAction = (userName: string, text: string) => {
        return (dispatch: Dispatch) => handleRequest(api.post("/note/add", { userName, text }), dispatch);
    };

    export const updateNoteAction = (userName: string, id: string, text: string) => {
        return (dispatch: Dispatch) => handleRequest(api.post("/note/update", { userName, id, text }), dispatch);
    }

    export const deleteNoteAction = (userName: string, id: string) => {
        return (dispatch: Dispatch) => handleRequest(api.post("/note/delete", { userName, id }), dispatch);
    }

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
            default:
                return state;
        }
    }

    export const selectModule = (state: any) => state[moduleName];

    export const selectIsLoading = createSelector(selectModule, (state: State) => state.loading);
    export const selectError = createSelector(selectModule, (state: State) => state.error);

    export const selectNotes = createSelector(AuthModule.selectModule, (state: AuthModule.State) => state.user?.notes);
}

export default NotesModule;