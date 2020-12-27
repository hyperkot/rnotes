import { nanoid } from "nanoid";

export interface Note {
    text: string;
    id: string;
    timeCreated: number;
    timeUpdated: number;
}

export namespace Note {
    export function create(text: string): Note {
        return {
            text,
            id: nanoid(),
            timeCreated: Date.now(),
            timeUpdated: Date.now()
        };
    }
    export function update(note: Note, text: string): Note {
        note.text = text;
        note.timeUpdated = Date.now();
        return note;
    }

    export function fromStringList(...src: string[]): Note[] {
        return src.map(create);
    }
}