/*
 * @ApiRoutes.js
 */
"use strict";


let express = require('express'),
    FetchThings = require('./PubApiRoutes/FetchThings'),
	JobsDispatcher = require('./PubApiRoutes/JobsDispatcher'),
    ApiRoutes = express.Router(),
    Fetcher = new FetchThings(),
	JobDispatch = new JobsDispatcher();
    PublicFetchThings = require('./PubApiRoutes/FetchThings'),
    PublicMakeThings = require('./PubApiRoutes/MakeThings'),
    ApiRoutes = express.Router(),
    PubFetchThings = new PublicFetchThings(),
    PubMakeThings = new PublicMakeThings();



/*
 *  routes
 */
// get things
ApiRoutes.get("/fetch/things", Fetcher.FetchThingsGet);
// start job
ApiRoutes.post("/jobs/run/make-things", JobDispatch.MakeThings);

// get things
ApiRoutes.post("/make/things", PubMakeThings.MakeThingsPost);
/*
 * export
 */
module.exports = ApiRoutes;
