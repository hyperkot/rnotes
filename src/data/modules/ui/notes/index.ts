import { AnyAction } from "redux";
import { createSelector } from "reselect";

export namespace NotesUIModule {
    export const moduleName = "ui/notes";

    export interface State {
    }
    
    export const initState = () => ({
    } as State);

    export const selectModule = (state: any): State => state[moduleName];

    // Actions
    const actionName = (name: string) => moduleName + "/" + name;


    // Reducer
    export const reducer = (state: State = initState(), action: AnyAction) => {
        switch (action.type) {
            default: return state;
        }
    };
};