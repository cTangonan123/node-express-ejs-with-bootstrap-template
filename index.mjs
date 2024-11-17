import express from 'express';
// import fetch from 'node-fetch'; // will be used when fetching from api's

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.set("view engine", "ejs");

// set const variables for the specified dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(`__filename: ${__filename}`); // used to debug
// console.log(`__dirname: ${__dirname}`);   // used to debug

// set static folder
app.use(express.static("public"));

// set static for bootstraps css and js folders
app.use('/css', express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));

app.get('/', (req, res) => {
  res.render('index', {"greeting": "Hello World"});
})

app.listen(3000, () => {
  console.log('server started: listening on localhost:3000');
})