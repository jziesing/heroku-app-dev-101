/*
 * @FetchThings.js
 */
"use strict";


let FetchThingsHelper = require('./FetchThingsHelper');

class FetchThings {

    constructor() {
        this.ahelper = new FetchThingsHelper();
		// methods
        this.FetchThingsGet = this.FetchThingsGet.bind(this);
    }
    /*  @route: /fetch/things/
     *     - GET
     */
    FetchThingsGet(req, res) {
        console.log('FetchThingsGet');
        res.setHeader('Content-Type', 'application/json');

        return this.ahelper.fetchThings()
                      .then(result => {
                            console.log(result);
                            return res.status(200).json(result);
                      }).catch(err => {
                            console.log(err);
                            return res.sendStatus(400);
                      });
    }

}

module.exports = FetchThings;
