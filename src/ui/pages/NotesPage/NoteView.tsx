import React from "react";

import { css } from "hocs";

export interface NoteViewProps {
    text: string;
    className?: string;
    onClick: () => void;
}

@css`
    background-color: #fff;
    color: black;
    padding: 4px;
    white-space: pre;
`
export class NoteView extends React.Component<NoteViewProps> {
    render() {
        const { text, className, onClick } = this.props;
        return <div className={className} onClick={onClick}>
            {text}
        </div>;
    }
}