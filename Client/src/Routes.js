"use strict";


let React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    browserHistory = ReactRouter.browserHistory,
    Layout = require("./pages/Layout/Layout.js"),
    HomePage = require("./pages/HomePage/HomePage.js");



module.exports = (
	<Router history={browserHistory} >
        <Route path="/" component={Layout}>
            <IndexRoute component={HomePage} />
        </Route>
    </Router>
);
