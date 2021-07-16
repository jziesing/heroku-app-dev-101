/*
 * @ApiRoutes.js
 */
"use strict";


let express = require('express'),
	JobsDispatcher = require('./PubApiRoutes/JobsDispatcher'),
    ApiRoutes = express.Router(),
	JobDispatch = new JobsDispatcher();
    PublicFetchThings = require('./PubApiRoutes/FetchThings'),
    PublicMakeThings = require('./PubApiRoutes/MakeThings'),
    PubFetchThings = new PublicFetchThings(),
    PubMakeThings = new PublicMakeThings();



/*
 *  routes
 */
// get things
ApiRoutes.get("/fetch/things", PubFetchThings.FetchThingsGet);
// start job
ApiRoutes.post("/jobs/run/make-things", JobDispatch.MakeThings);

// get things
// ApiRoutes.post("/make/things", PubMakeThings.MakeThingsPost);
/*
 * export
 */
module.exports = ApiRoutes;
