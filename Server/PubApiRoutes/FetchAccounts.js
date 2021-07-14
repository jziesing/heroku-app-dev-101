/*
 * @ContactRoutes.js
 */
"use strict";


let FetchAccountsHelper = require('./FetchAccountsHelper');
const { Client } = require('pg');

class FetchAccounts {

    constructor() {
        this.ahelper = new FetchAccountsHelper();
		// methods
        this.FetchThingsGet = this.FetchThingsGet.bind(this);
    }
    /*  @route: /fetch/accounts/
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

module.exports = FetchAccounts;
