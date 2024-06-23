const EXPRESS = require('express');
const APP = EXPRESS();
const BODYPARSER = require('body-parser');
require('dotenv').load;
const PORT = process.env.PORT || 8010;

APP.use(BODYPARSER.urlencoded({ extended: true }));
APP.use(BODYPARSER.json());

let routes = require('./api/routes'); //importing route
routes(APP); 

APP.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

APP.listen(PORT);

console.log('RESTful API server started on: ' + PORT);