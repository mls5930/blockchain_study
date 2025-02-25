"use strict";

var fn = function fn(message) {
  var arr = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 0];
  var arr3 = [].concat(arr, arr2);
  console.log(arr3, message);
};
fn("hello world");
