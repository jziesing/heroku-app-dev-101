/*
 * @FetchAccountsHelper.js
 */
"use strict";

const { Client } = require('pg');


class FetchAccountsHelper {

    constructor() {
		// methods
        this.fetchThings = this.fetchThings.bind(this);
    }

    fetchThings() {
        return new Promise((resolve, reject) => {

            let currclient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                  }
            });

            currclient.connect();

            currclient.query('SELECT Id, title, description FROM public.thing;', (err, res) => {
                if (err){
                    reject();
                }
                currclient.end();
                resolve(res.rows);
            });
        });

    }


}

module.exports = FetchAccountsHelper;
