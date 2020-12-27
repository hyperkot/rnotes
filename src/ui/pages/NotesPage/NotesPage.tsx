import * as React from "react";
import { Dispatch } from "redux";

import { AppTitle, Loading, PageWrapper } from "ui/common";
import { Note } from "data/types";

import { AuthModule, NotesModule } from "modules"

import { connect, derive } from "hocs";
import { bound } from "lib";

import { NoteRow } from "./NoteRow";
import { PageTabs } from "ui/common/PageTabs/PageTabs";

export interface NotesPageProps {
    notes?: Note[];
    userName?: string;
    isLoading?: boolean;
    addNote?: (text?: string) => void;
    updateNote?: (id: string, text: string) => void;
    deleteNote?: (id: string) => void;
}

export interface NotesPageState {
    editingId?: string;
}

@connect(
    (state: any) => ({
        notes: NotesModule.selectNotes(state),
        userName: AuthModule.selectUserName(state),
        isLoading: NotesModule.selectIsLoading(state)
    }),
    (dispatch: Dispatch) => ({
        _addNote: (userName: string, text: string) => {
            dispatch(NotesModule.addNoteAction(userName, text) as any)
        },
        _updateNote: (userName: string, id: string, text: string) => {
            dispatch(NotesModule.updateNoteAction(userName, id, text) as any);
        },
        _deleteNote: (userName: string, id: string) => {
            dispatch(NotesModule.deleteNoteAction(userName, id) as any);
        }
    })
)
@derive(({ _addNote, _updateNote, _deleteNote, userName }: {
    _addNote: (userName: string, text: string) => void, userName: string
    _updateNote: (userName: string, id: string, text: string) => void,
    _deleteNote: (userName: string, id: string) => void
}) => ({
    addNote: (text: string = "") => _addNote(userName, text),
    updateNote: (id: string, text: string) => _updateNote(userName, id, text),
    deleteNote: (id: string) => _deleteNote(userName, id)
}))
export class NotesPage extends React.Component<NotesPageProps, NotesPageState> {

    constructor(props: NotesPageProps) {
        super(props);
        this.state = {
            editingId: null
        };
    }

    @bound
    onAddNote() {
        this.props.addNote();
    }

    render() {
        const { notes, userName, isLoading } = this.props;
        return <PageWrapper>
            <AppTitle />
            <PageTabs />
            <Loading loading={isLoading}>

                {notes.map(note => {
                    return <NoteRow
                        note={note}
                        isEditing={this.state.editingId == note.id}
                        onChange={(newText: string) => {
                            this.props.updateNote(note.id, newText);
                            this.setState({ editingId: null });
                        }}
                        onClick={() => {
                            this.setState({ editingId: note.id });
                        }}
                        onDelete={() => this.props.deleteNote(note.id)}
                    />;
                })}

                <input type="button" value="+" onClick={this.onAddNote} />

            </Loading>
        </PageWrapper>;
    }
}