const isLoggedin = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    const error = "Login first to access isWatch";
    res.redirect(`/login?error=${error}`);
  }
};

module.exports = { isLoggedin };
