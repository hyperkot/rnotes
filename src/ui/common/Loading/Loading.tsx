import React from "react";
import { css } from "hocs";

import imgSrc from "./45.gif";

export interface LoadingProps {
    className?: string;
    loading: boolean;
}

@css`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.85);
    text-align: center;
    img {
        margin-left: auto;
        margin-right: auto;
        position: relative;
    }
`
export class Loading extends React.Component<LoadingProps> {
    render() {
        const { className, loading, children } = this.props;
        return loading ? (<div className={className}>
            <img src={imgSrc} />
        </div>) : <React.Fragment>{children}</React.Fragment>;
    }
}