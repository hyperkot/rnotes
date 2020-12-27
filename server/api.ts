import express from "express";
import bodyParser from "body-parser";

import { findUser, createUser, updateUser, deleteUser } from "./db";
import { Note, User } from "./types";

const api = express.Router();

api.use(bodyParser.json(), (req, _res, next) => {
    console.log("API REQUEST: ", req.url);
    console.log("QUERY: ", req.query);
    console.log("BODY: ", req.body);
    next();
});

function apiErrorHandler(res: express.Response) {
    return (err: Error) => res.json({ error: err.message });
}

api.post("/user/register", (req, res) => {
    const { name, password } = req.body;
    createUser(name, password).then(user => res.json(user), apiErrorHandler(res));
});

api.post("/user/login", (req, res) => {
    const { name, password } = req.body;
    findUser(name, password).then(user => res.json(user), apiErrorHandler(res));
});

api.post("/note/add", (req, res) => {
    const { userName, text } = req.body;
    findUser(userName).then(user => {
        User.addNote(user, text)
        updateUser(user).then((user) => res.json(user), apiErrorHandler(res));
    }, apiErrorHandler(res));
});

api.post("/note/update", (req, res) => {
    const { userName, id, text } = req.body;
    findUser(userName).then(user => {
        User.updateNote(user, id, text);
        updateUser(user).then((user) => res.json(user), apiErrorHandler(res));
    }, apiErrorHandler(res));
});

api.post("/note/delete", (req, res) => {
    const { userName, id } = req.body;
    findUser(userName).then(user => {
        User.deleteNote(user, id);
        updateUser(user).then((user) => res.json(user), apiErrorHandler(res));
    }, apiErrorHandler(res));
});

export default api;