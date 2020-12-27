import React, { createRef } from "react";

import { css } from "hocs";
import { bound } from "lib";

@css`
    background-color: #fff;
    color: black;
    padding: 4px;
`
export class NoteEditor extends React.Component<NoteEditor.Props, NoteEditor.State> {

    private textAreaRef: React.RefObject<HTMLTextAreaElement> = createRef();
    constructor(props: NoteEditor.Props) {
        super(props);
        this.state = {
            text: props.initialText
        };
    }

    @bound
    onHandleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            text: e.currentTarget.value
        });
    }

    @bound
    onHandleCommit() {
        const { onChange } = this.props;
        onChange(this.state.text);
    }
    render() {
        const { className } = this.props;
        const { text } = this.state;

        return <div className={className}>
            <textarea value={text} onChange={this.onHandleChange} onBlur={this.onHandleCommit} ref={this.textAreaRef} />
        </div>;
    }
    componentDidMount() {
        this.textAreaRef.current?.focus();
    }
}

export namespace NoteEditor {
    export interface Props {
        initialText: string;
        className?: string;
        onChange: (newText: string) => void;
    }

    export interface State {
        text: string;
    }
}