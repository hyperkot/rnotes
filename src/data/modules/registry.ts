import { Reducer, combineReducers, ReducersMapObject } from "redux";
import { connectRouter } from 'connected-react-router';


export namespace Registry {
    const registeredModules: { [name: string]: RegisteredModule } = {};

    const listModules = () => Object.values(registeredModules);

    let locked: boolean = false;

    export interface RegisteredModule {
        readonly moduleName: string;
        readonly initState: () => any;
        readonly reducer: Reducer;
    }

    export function lock() {
        locked = true;
    }

    export function registerModule(descriptor: RegisteredModule) {
        if (registeredModules[descriptor.moduleName]) {
            throw new Error(`Module '${descriptor.moduleName}' already registered!`);
        }
        if (locked) {
            throw new Error(`Cannot add module ${descriptor.moduleName} - registry is already locked`);
        }
        registeredModules[descriptor.moduleName] = descriptor;
    }

    export function getCombinedReducer(history: any) {
        if (!locked) {
            throw new Error(`Registry must be locked to get combined reducer`);
        }

        let reducerMap: { [name: string]: Reducer } = listModules()
            .reduce((res: any, module: RegisteredModule) => {
                res[module.moduleName] = module.reducer;
                return res;
            }, {});

        return combineReducers({
            router: connectRouter(history),
            ...reducerMap
        });
    }

    export function getCombinedInitialState() {
        if (!locked) {
            throw new Error(`Registry must be locked to get combined initial state`);
        }

        let stateMap: { [name: string]: any } = listModules()
            .reduce((res: any, module: RegisteredModule) => {
                res[module.moduleName] = module.initState();
                return res;
            }, {});
        return stateMap;
    }

};

export function module(descr: any) {
    Registry.registerModule(descr);
    return descr;
}