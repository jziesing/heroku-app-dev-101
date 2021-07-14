/*
 * @ApiRoutes.js
 */
"use strict";


let express = require('express'),
    PublicFetchAccounts = require('./PubApiRoutes/FetchAccounts'),
    ApiRoutes = express.Router(),
    PubFetchAccounts = new PublicFetchAccounts();



/*
 *  routes
 */
// add external data
// ApiRoutes.post("/new/extdata/", PubAddExtData.AddExtDataPost);

// get child accounts
// ApiRoutes.get("/fetch/account/:parentAccountId", PubFetchAccounts.FetchChildAccountsGet);
ApiRoutes.get("/fetch/things", PubFetchAccounts.fetchThings);


/*
 * export
 */
module.exports = ApiRoutes;
