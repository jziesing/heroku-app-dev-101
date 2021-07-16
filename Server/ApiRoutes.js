/*
 * @ApiRoutes.js
 */
"use strict";


let express = require('express'),
    PublicFetchThings = require('./PubApiRoutes/FetchThings'),
    PublicMakeThings = require('./PubApiRoutes/MakeThings'),
    ApiRoutes = express.Router(),
    PubFetchThings = new PublicFetchThings(),
    PubMakeThings = new PublicMakeThings();



/*
 *  routes
 */
// get things
ApiRoutes.get("/fetch/things", PubFetchThings.FetchThingsGet);

// get things
ApiRoutes.post("/make/things", PubMakeThings.MakeThingsPost);
/*
 * export
 */
module.exports = ApiRoutes;
