"use strict";
module.exports = function (APP) {
  let inputsCtrl = require("./controllers/InputsController.js");

  // todoList Routes
  APP.route("/inputButt")
    .get(inputsCtrl.get)
    .post(inputsCtrl.store);

  APP.route("/inputButt/:input")
    .get(inputsCtrl.detail)
    .put(inputsCtrl.update)
    .delete(inputsCtrl.delete);
};
