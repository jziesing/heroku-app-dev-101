/*
 * @JobsDispatcherHelper.js
 */
"use strict";

let Queue = require('bull');


class JobsDispatcherHelper {

    constructor() {
		// methods
        this.makeThings = this.makeThings.bind(this);
    }

    async makeThings() {
        return new Promise((resolve, reject) => {


			let workQueue = new Queue('makethings', process.env.REDIS_URL);
			let job = workQueue.add();

			// try {
			// 	job = await workQueue.add();
			// } catch (error) {
			// 	reject('job errored');
			// }


			resolve(job.id);

        });

    }


}

module.exports = JobsDispatcherHelper;
