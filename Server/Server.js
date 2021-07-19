/*
 * @Server.js
 */
"use strict";




// require("babel-polyfill");


let express = require('express'),
	bodyParser = require('body-parser'),
	apiRoutes = require('./ApiRoutes');



//  create server app
let app = express();
let port = process.env.PORT || 3000;

// parsing
// app.use(bodyParser.text());
app.use(bodyParser.json());

// api
app.use(apiRoutes);


require('babel-register')({
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['react-html-attrs', 'add-module-exports']
});

let clientRouter = require('./ClientRouter');

// web client --> looks at cname
app.use(express.static(__dirname + '/../Client/build/'));
app.use(clientRouter);


//  run
app.listen(port, () => console.log( "Express server listening on port " + port) );
