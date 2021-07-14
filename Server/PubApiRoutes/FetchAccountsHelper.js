/*
 * @FetchAccountsHelper.js
 */
"use strict";

const { Client } = require('pg');


class FetchAccountsHelper {

    constructor() {
		// methods
        this.fetchAccounts = this.fetchAccounts.bind(this);
        this.fetchChildAccounts = this.fetchChildAccounts.bind(this);
    }

    fetchAccounts() {
        return new Promise((resolve, reject) => {

            let currclient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                  }
            });

            currclient.connect();

            currclient.query('SELECT Id, SFID, Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, BillingLatitude, BillingLongitude FROM Salesforce.Account WHERE billingcountry = \'USA\' AND billinglatitude IS NOT NULL;', (err, res) => {
                if (err){
                    reject();
                }
                currclient.end();
                resolve(res.rows);
            });
        });

    }

    fetchChildAccounts(parentAccountId) {
        return new Promise((resolve, reject) => {
		console.log('helper method hit');
            let currclient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            });

		console.log('BEFORE connecting');

            currclient.connect();

		console.log('AFTER connecting');

            currclient.query('SELECT Id, SFID, Name, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, ShippingCountry, ShippingLatitude, ShippingLongitude, ParentId FROM Salesforce.Account WHERE ParentId=$1;', [parentAccountId], (err, res) => {
                if (err){

		    console.log('ERROR getting accounts');
		    console.log(err);
                    reject();
                }
		    console.log('GOT accounts');
		    console.log(res);
                currclient.end();
                resolve(res.rows);
            });
        });

    }

}

module.exports = FetchAccountsHelper;
