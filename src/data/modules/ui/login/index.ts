import { AnyAction, Action } from "redux";
import { createSelector } from "reselect";

export namespace LoginUIModule {
    export const moduleName = "ui/login";

    export interface State {
        name: string;
        password: string;
    }
    
    export const initState = () => ({
        name: "",
        password: "",
    } as State);

    export const selectModule = (state: any): State => state[moduleName];
    export const selectName = createSelector(selectModule, (state: State) => state.name);
    export const selectPassword = createSelector(selectModule, (state: State) => state.password);
    export const selectDataValid = createSelector(selectModule, (state: State) => (state.name.length > 1) && (state.password.length > 1));

    // Actions
    const actionName = (name: string) => moduleName + "/" + name;
    
    const setPasswordActionName = actionName("setPassword");
    export const setPasswordAction = (value: string) => ({value, type: setPasswordActionName});

    const setNameActionName = actionName("setName");
    export const setNameAction = (value: string) => ({value, type: setNameActionName});


    // Reducer
    export const reducer = (state: State = initState(), action: AnyAction) => {
        switch (action.type) {
            case setNameActionName:
                return { ...state, name: action.value };
            case setPasswordActionName:
                return { ...state, password: action.value }
            default: return state;
        }
    };
};