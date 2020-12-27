import * as React from "react";
import { css } from "hocs";

export interface AppTitleProps {
    className?: string;
}

@css`
    background-color: #021;
    font-size: 20px;
    padding: 4px;
    border-bottom: 1px solid #003;
`
export class AppTitle extends React.Component<AppTitleProps> {
    render() {
        return <div className={this.props.className}> rnotes </div>;
    }
}