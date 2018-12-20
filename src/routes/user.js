const express = require('express');
const router = express.Router();

router.get('/singin', (req, res) => {
  res.send('singin');
});

router.get('/singup', (req, res) => {
  res.send('singup');
});

module.exports = router