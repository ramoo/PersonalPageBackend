var express = require('express');
var router = express.Router();
var security = require('../services/security');

router.get("/", security.passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json("This page is protected");
});

module.exports = router;