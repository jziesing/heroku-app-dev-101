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
	console.log('checking job');
  let id = req.params.id;
  console.log('before job call');
  let job = await workQueue.getJob(id);
	console.log('after job call');
	console.log(job);
  if (job === null) {
    res.status(404).end();
  } else {
	  console.log('before state call');
    let state = await job.getState();
  	  console.log('after state call');
    let progress = job._progress;
    let reason = job.failedReason;
    res.status(200).json({ id, state, progress, reason });
  }
});

// get things
// ApiRoutes.post("/make/things", PubMakeThings.MakeThingsPost);
/*
 * export
 */
module.exports = ApiRoutes;
