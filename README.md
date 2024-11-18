# node-express-ejs-with-bootstrap-template
Reason for making was it was difficult finding clear instructions on how to initialize bootstrap as an npm package in accordance with our current courses pre-defined build structure (Node, Express, and EJS as it's view engine). Opted to build it once then, pull from it for each project using this structure in the future.

## if using as a template
just run `npm install` and should run out the box
- note: `nodemon` must be installed prior, can be done globally or locally

## manually install bootstrap for project using Nodejs, Express and EJS
-  initialize npm into your project folder:
```bash
$ npm init # npm init -y # for silent build, no prompting
```

- install express and ejs
```bash
$ npm i express ejs
```

- install bootstrap
```bash
$ npm i bootstrap@v5.3.3 # latest version currently
```
- install sass either as dev dependent package or globally
```bash
$ npm install sass --save-dev
```
- set up file structure
```bash
project
	|
	+-- node_modules # 
	|
	+-- public       # static file for resources
	|	|
	|	+-- css      # custom css
	|	+-- img      # static images
	|	+-- js       # custom js
	|
	+-- views        # directory to place views/pages
	|	|
	|	+-- partials # directory to place partials
	|
	* index.mjs      # initial app
	
```
- create a `styles.scss` file
  - dependent of file structure, this file is located in the folder designated for styling...in this instance, it would be the `/css` folder in our `public` folder, create the file, and insert in this snippet:
  - note: this file is designated for any sass related variable changes, and must be instantiated above the import line.
```scss
// example variable change
// $primary: red; // uncomment to see variable changes

// custom scss goes above this line, such as variable or map changes etc...
@import "../../node_modules/bootstrap/scss/bootstrap.scss"
```
- in your `package.json` file you can shorthand some commands that will be used regularly, in the scripts key, enter in these three key value pairs.
```js
  "scripts": {
    "server": "nodemon index.mjs"
    "build-css": "sass public/css/styles.scss public/css/styles.css"
    "watch-css": "sass --watch public/css/styles.scss public/css/styles.css"
  }
```
- now in a terminal window you can implement `build-css` command via `npm run`, this will build the bootstrap css file and place it where your designated stylesheet will go
```bash
$ npm run build-css
```
- 

- in your `index.mjs` file include the imports:
```js
import path from 'path';
import {fileURLToPath} from 'url';
```

- set `__filename` and `__dirname` to:
```js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

- when setting your static paths include these lines:
```js
// use static file instances
app.use(express.static("public"));
// for bootstrap js, also include paths in partials of head
app.use('/js', express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
```

- then be sure to include a link/script to each page, alternatively build a `head.ejs` partial and include these lines within.
```html
<!--head.ejs file-->
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Project</title>
    <!-- custom styling sheet -->
    <link rel="stylesheet" href="/css/styles.css">

	<!-- bootstrap related content -->
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <script src="./js/bootstrap.bundle.min.js"></script>
</head>
```

- that should be it and now bootstrap can be used in your views and partials files.
- `index.mjs` should look something like this:
```js
import express from 'express';
// import fetch from 'node-fetch'; // will be used when fetching from api's

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.set("view engine", "ejs");

// set const variables for the specified dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set static folder
app.use(express.static("public"));

// set static for bootstraps js folders
app.use('/js', express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));

app.get('/', (req, res) => {
  res.render('index', {"greeting": "Hello World"});
})

app.listen(3000, () => {
  console.log('server started: listening on localhost:3000');
})
```
- and the `head.ejs` file something like this:
```js
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- custom styling sheet -->
  <link rel="stylesheet" href="/css/styles.css">

  <!-- bootstrap related content -->
  <script src="./js/bootstrap.bundle.min.js"></script>
</head>
```
- in a new terminal you can run you server with:
```bash
$ npm run server
```
