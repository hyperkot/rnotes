
import { nanoid } from "nanoid";
import { Note } from "./Note";

export interface User {
    name: string;
    password: string; // Забив на безопасность храним и передаем в чистом виде
    // ToDo: вынести notes в отдельную таблицу
    notes: Note[]; // Да, пока нет разбиения на сущности в бд, по сути она одна таблица
}

export namespace User {
    export function create(name: string, password: string): User {
        return {
            name,
            password,
            notes: []
        }
    }

    export function addNote(user: User, text: string) {
        const note = Note.create(text);
        user.notes.push(note);
        return user;
    }

    export function updateNote(user: User, id: string, text: string) {
        const note = user.notes.find(note => note.id == id);
        if (!note) throw new Error('Incosisten data state');
        Note.update(note, text);
        return user;
    }

    export function deleteNote(user: User, id: string) {
        const note = user.notes.find(note => note.id == id);
        const index = user.notes.indexOf(note);
        user.notes.splice(index, 1);
        if (!note) throw new Error('Incosisten data state');
        
        return user;
    }
}