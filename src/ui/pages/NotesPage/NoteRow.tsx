import React from "react";

import { css } from "hocs";
import { Note } from "types";

import { NoteView } from "./NoteView";
import { NoteEditor } from "./NoteEditor";

export interface NoteRowProps {
    note: Note;
    className?: string;
    isEditing: boolean;
    onChange: (newText: string) => void;
    onClick: () => void;
    onDelete: () => void;
}

@css`
    background-color: #888;
    margin: 4px;
    display: flex;
    flex-direction: row;
    > div {
        flex-basis: 100%;
        flex-shrink: 1;
        flex-grow: 1;
    }
    > input {
        flex-basis: 50px;
        flex-grow: 0;
        flex-shrink: 0;
    }
`
export class NoteRow extends React.Component<NoteRowProps> {
    render() {
        const { note, className, isEditing } = this.props;
        return <div className={className}>
            {
                isEditing
                    ? (<NoteEditor initialText={note.text} onChange={this.props.onChange} />)
                    : (<NoteView text={note.text} onClick={this.props.onClick} />)
            }
            {
                isEditing && <input type="button" value="✓" />
            }
            <input type="button" value="✗" onClick={this.props.onDelete} />
        </div>;
    }
}