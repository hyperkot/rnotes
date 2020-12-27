import React from "react";

// ToDo: запоминать производные и вычислять заново только при изменении исходных
export function derive(fn: (props: any) => any): any {
    return function DeriveDecorator(ComponentClass: any) {
        return function WithDerivedProps(props: any) {
            const derivedProps = fn(props);
            return <ComponentClass {...{ ...props, ...derivedProps }} />;
        }
    }
}