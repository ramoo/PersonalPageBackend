var express = require('express');
var router = express.Router();
var accounts = require('../services/users');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var security = require('../services/security');

router.post('/login', function(req, res, next) {
  if (req.body.name && req.body.password) {
    var name = req.body.name;
    var password = req.body.password;
  }

  var user = accounts[_.findIndex(accounts, { name: name })];

  if (!user) {
    res.status(401).json({ message: "user not found" });
  } else {
    if (user.password !== password) {
      res.status(401).json({ message: "wrong password" });
    } else {
      var payload = { id: user.id };
      var token = jwt.sign(payload, security.jwtOptions.secretOrKey, { expiresIn: 300 });

      res.status(200).json({ message: "ok", token: token });
    }
  }
});

module.exports = router;