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

	MakeThingsHelper() {
		let redisURL = process.env.REDIS_URL;
		let workQueue = new Queue('makethings', process.env.REDIS_URL);

		return new Promise(async function(resolve, reject) {


			let workQueue = new Queue('makethings', {
				redis: {
					port: Number(redisURL.split(':')[3]),
					host: redisURL.split(':')[2].split('@')[1],
					password: redisURL.split(':')[2].split('@')[0],
					tls: {
						rejectUnauthorized: false
					}
				}
			});
			let job = await workQueue.add();

			// try {
			// 	job = await workQueue.add();
			// } catch (error) {
			// 	reject('job errored');
			// }


			resolve({jobid: job.id});

        });
	}
    /*  @route: /jobs/run/
     *     - GET
     */
    MakeThings(req, res) {
        res.setHeader('Content-Type', 'application/json');
		console.log('before jobs');

		return this.MakeThingsHelper()
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
