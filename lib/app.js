'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var express = require('express');
// var bodyParser = require('body-parser');

// var app = express();
// var router = express.Router();

/// ES6
var app = (0, _express2.default)();
var router = (0, _express.Router)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
//app.use(cookieParser());

router.get('/', function (req, res, next) {
  res.end('Hello World! ^_^...');
});

app.use('/', router);

app.listen(3000, function () {
  console.log('server listening at port 3000...');
});