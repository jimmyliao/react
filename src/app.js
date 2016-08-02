// var express = require('express');
// var bodyParser = require('body-parser');

// var app = express();
// var router = express.Router();

/// ES6
import express, { Router } from 'express';
import bodyParser from 'body-parser';

let app = express();
let router = Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());

router.get('/', function(req, res, next) {
  res.end('Hello World! ^_^...');
});

app.use('/', router);

app.listen(3000, function() {
  console.log('server listening at port 3000...');
});
