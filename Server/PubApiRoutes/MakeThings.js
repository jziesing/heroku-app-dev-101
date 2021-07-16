/*
 * @MakeThings.js
 */
"use strict";


const Queue = require('bull');

class MakeThings {

    constructor() {
		// methods
        this.MakeThingsPost = this.MakeThingsPost.bind(this);
        this.makeThingsHelper = this.makeThingsHelper.bind(this);
    }

    makeThingsHelper() {
        const redisURL = process.env.REDIS_URL;
        return new Promise(async function(resolve, reject) {
                console.log('makeThingsHelperrrr');
                console.log(process.env.REDIS_URL);
                let workQueue = new Queue('makethings', {
                                                redis: {
                                                    port: Number(redisURL.split(':')[3]),
                                                    host: redisURL.split(':')[2].split('@')[1],
                                                    password: redisURL.split(':')[2].split('@')[0],
                                                    tls: {
                                                        rejectUnauthorized: false
                                                    }
                                                }});
                console.log('before awaiiddd');
                workQueue.add()
                         .then(result => {
                             console.log('SUCESSs added  worrkk!!!!');
                              console.log(result);
                              resolve(result);
                         }).catch(err => {
                             console.log('hit add  worrkk errorrr');
                              console.log(err);
                              reject(err);
                         });
                // console.log('afterrr awaittt');
                // resolve(job.id);
        });
    }
    /*  @route: /fetch/things/
     *     - GET
     */
    MakeThingsPost(req, res) {
        console.log('MakeThingsGet');
        res.setHeader('Content-Type', 'application/json');

        return this.makeThingsHelper()
                      .then(result => {
                            console.log(result);
                            return res.status(200).json(result);
                      }).catch(err => {
                            console.log(err);
                            return res.sendStatus(400);
                      });
    }

}

module.exports = MakeThings;
