// routes/auth/checkAuth.js
const express = require('express');
const router = express.Router();

router.get('/check-auth', (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ isAuthenticated: true, user: req.session.user });
  } else {
    return res.status(200).json({ isAuthenticated: false });
  }
});

module.exports = router;
