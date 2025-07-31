// server/middleware/auth.js

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user && req.session.user._id) {
    return next(); // user terautentikasi, lanjut ke route
  }
  return res.status(401).json({ message: 'Anda harus login terlebih dahulu' });
}

module.exports = isAuthenticated;
