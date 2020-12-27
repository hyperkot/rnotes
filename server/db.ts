import NeDB from "nedb";

import { User } from "./types";

const db = new NeDB({
    filename: "./server/users.json", // На данный момент сервер надо запускать исключительно из корня проекта
});

export function initDB(): Promise<Nedb> {
    return new Promise((resolve, reject) => {
        db.loadDatabase((err: Error) => {
            if (err) {
                console.log(err.stack);
                reject(err);
            } else {
                resolve(db);
            }
        });
    });

}

export function findUser(name: string, password?: string): Promise<User> {
    return new Promise((resolve, reject) => {
        const query = password ? { name, password } : { name };
        console.log("FIND ONE", name, password, query);
        db.findOne(query, (err: Error, document: User) => {
            console.log("FIND ONE =>", err, document);
            if (err) {
                console.log(err.stack);
                reject(err);
            } else {
                if (document == null) {
                    console.log(query, " not found");
                    if (password) {
                        reject(new Error(`User ${name} not found or incorrect password`));
                    } else {
                        reject(new Error(`User ${name} not found`));
                    }
                } else {
                    resolve(document);
                }
            }
        });
    });
}

export function createUser(name: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
        findUser(name).then(
            () => reject(new Error(`User ${name} alredy exists`)),
            () => {
                const newUser = User.create(name, password);
                db.insert(newUser, (err: Error, user: User) => {
                    if (err) {
                        console.log(err.stack);
                        reject(err);
                    } else {
                        resolve(user);
                    }
                })
            }
        );
    });
}

export function updateUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
        findUser(user.name).then(
            () => {
                db.update({ name: user.name }, user, {}, (err: Error) => {
                    if (err) {
                        console.log(err.stack);
                        reject(err);
                    } else {
                        resolve(user);
                    }
                })
            },
            () => reject(new Error(`User ${user.name} doesn't exist`))
        );
    });
}

export function deleteUser(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.remove({ name }, (err: Error) => {
            if (err) {
                console.log(err.stack);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
