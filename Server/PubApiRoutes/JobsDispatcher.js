/*
 * @JobsDispatcher.js
 */


let Queue = require('bull');

class JobsDispatcher {

    constructor() {
		// methods

		this.MakeThingsHelper = this.MakeThingsHelper.bind(this);
		this.MakeThings = this.MakeThings.bind(this);
    }

	MakeThingsHelper(number_things) {
		let redisURL = process.env.REDIS_URL;
		//let workQueue = new Queue('makethings', process.env.REDIS_URL);

		return new Promise(async function(resolve, reject) {

			let workQueue = new Queue('makethings', redisURL);
			let job = await workQueue.add({ num_things: number_things.toString()});

			resolve({jobid: job.id});

        });
	}
    /*  @route: /jobs/run/
     *     - POST
     */
    MakeThings(req, res) {
        res.setHeader('Content-Type', 'application/json');
		console.log('before jobs');

		return this.MakeThingsHelper(req.body.num_things)
                      .then(result => {
                            console.log(result);
                            return res.status(200).json(result);
                      }).catch(err => {
                            console.log(err);
                            return res.sendStatus(400);
                      });

    }

}

module.exports = JobsDispatcher;
