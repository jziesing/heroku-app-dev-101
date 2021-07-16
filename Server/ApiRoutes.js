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



/*
 *  routes
 */
// get things
ApiRoutes.get("/fetch/things", Fetcher.FetchThingsGet);
// start job
ApiRoutes.post("/jobs/run/make-things", JobDispatch.MakeThings);

/*
 * export
 */
module.exports = ApiRoutes;
