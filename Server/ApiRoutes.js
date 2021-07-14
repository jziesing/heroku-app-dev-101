/*
 * @ApiRoutes.js
 */
"use strict";


let express = require('express'),
    PublicFetchThings = require('./PubApiRoutes/FetchThings'),
    ApiRoutes = express.Router(),
    PubFetchThings = new PublicFetchThings();



/*
 *  routes
 */
// get things
ApiRoutes.get("/fetch/things", PubFetchThings.FetchThingsGet);

/*
 * export
 */
module.exports = ApiRoutes;
