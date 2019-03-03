'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function defaultCallback() {
  return /* Stop */[undefined];
}

function create(param) {
  return /* record */[
          /* id */undefined,
          /* callback */defaultCallback
        ];
}

function onAnimationFrame(animation, param) {
  if (animation[/* id */0] !== undefined) {
    var match = animation[/* callback */1]();
    if (match) {
      var match$1 = match[0];
      if (match$1 !== undefined) {
        animation[/* id */0] = undefined;
        return Curry._1(match$1, /* () */0);
      } else {
        animation[/* id */0] = undefined;
        return /* () */0;
      }
    } else {
      animation[/* id */0] = Caml_option.some(requestAnimationFrame((function (param) {
                  return onAnimationFrame(animation, param);
                })));
      return /* () */0;
    }
  } else {
    return 0;
  }
}

function start(animation) {
  animation[/* id */0] = Caml_option.some(requestAnimationFrame((function (param) {
              return onAnimationFrame(animation, param);
            })));
  return /* () */0;
}

function stop(animation) {
  var match = animation[/* id */0];
  if (match !== undefined) {
    cancelAnimationFrame(Caml_option.valFromOption(match));
    animation[/* id */0] = undefined;
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function setCallback(animation, callback) {
  stop(animation);
  animation[/* callback */1] = callback;
  return /* () */0;
}

function isActive(animation) {
  return animation[/* id */0] !== undefined;
}

exports.create = create;
exports.isActive = isActive;
exports.setCallback = setCallback;
exports.start = start;
exports.stop = stop;
/* No side effect */
