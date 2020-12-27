//const express = require('express');
import express from "express";
import serveStatic from "serve-static";
import process from "process";
import morgan from "morgan";

import { initDB } from "./db";
import api from "./api";
import fs from "fs";

const kill: any = require("kill-port");// так из-за implicit any при import

let isShuttingDown = false;

function logError(error: any) {
    console.error(error);
}

const PORT = 5000;

initDB().then(
    (db) => {
        const app = express();

        // это часть хака по закрытию процесса см конец файла
        app.use(function (_req, _res, next) {
            if (isShuttingDown) {
                return;
            }
            next();
        });

        // К хренам отключим все кэширование
        app.set('etag', false);
        app.use((_req, res, next) => {
            res.set('Cache-Control', 'no-store')
            next()
        });


        app.use(morgan('combined'));
        app.use(serveStatic("dist", {
            cacheControl: false,
            etag: false,
            extensions: ['html', "png", "gif", "jpeg", "jpg"]
        }));
        app.use("/api", api);
        app.use("/*", (_req, res) => {
            const indexContents = fs.readFileSync("./dist/index.html");
            res.setHeader("content-type", "text/html");
            res.send(indexContents);
        });


        app.listen(PORT, () => {
            console.log("Server started.");
        });

        process.on('SIGINT', function () {
            isShuttingDown = true;
            console.log("Shutting down...");
            // Этот хак понадобился потому что процесс при закрытии
            // на винде вечно вис и блокировал порт
            kill(PORT, 'tcp')
                .then(console.log)
                .catch(console.log)
        });
    },
    logError
);



