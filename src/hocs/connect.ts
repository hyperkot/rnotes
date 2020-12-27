import {connect as ReduxConnect} from "react-redux";

// ToDo: ликввидировать этот враппер, он нужен только из-за того что не удалось разобраться с типами
export function connect(mapStateToProps: any, mapDispatchToProps?: any): (component: any) => any {
    return ReduxConnect(mapStateToProps, mapDispatchToProps);
}