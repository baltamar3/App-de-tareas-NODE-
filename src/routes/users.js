const express = require('express');
const router = express.Router();

router.get('/singin', (req, res) => {
  res.render('users/singin');
});

router.get('/singup', (req, res) => {
  res.render('users/singup');
});

module.exports = router