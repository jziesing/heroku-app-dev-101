/*
 * @ApiRoutes.js
 */
"use strict";


let express = require('express'),
	JobsDispatcher = require('./PubApiRoutes/JobsDispatcher'),
    PublicFetchThings = require('./PubApiRoutes/FetchThings'),
    ApiRoutes = express.Router(),
    PubFetchThings = new PublicFetchThings(),
	JobDispatch = new JobsDispatcher();

	let Queue = require('bull');

let workQueue = new Queue('work', process.env.REDIS_URL);
/*
 *  routes
 */
// get things
ApiRoutes.get("/fetch/things", PubFetchThings.FetchThingsGet);
// start job
ApiRoutes.post("/jobs/run/make-things", JobDispatch.MakeThings);

ApiRoutes.get('/job/:id', async (req, res) => {
  let id = req.params.id;
  let job = await workQueue.getJob(id);

  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    let progress = job._progress;
    let reason = job.failedReason;
    res.json({ id, state, progress, reason });
  }
});

// get things
// ApiRoutes.post("/make/things", PubMakeThings.MakeThingsPost);
/*
 * export
 */
module.exports = ApiRoutes;
