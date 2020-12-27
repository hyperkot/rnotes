import React from "react";
import { useSelector } from "react-redux";

export function withRouter(ComponentClass: any): any {
    return function WithRouter(props: any) {
        const router = useSelector((state: any) => state.router);
        return <ComponentClass {...{ ...props, router }} />;
    }
}