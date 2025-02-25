"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// const express = require('express')

const app = (0, _express.default)();
app.get('/', (req, res) => {
  res.send('Hello, Babel With Express!');
});
app.listen(3000, () => {
  console.log("Server is running");
});
