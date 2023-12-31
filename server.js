import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/templates/index.dev.html")
});

app.get("/resume", (req, res) => {
    res.sendFile(__dirname + "/templates/index.dev.html")
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/templates/index.dev.html")
});

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
});