module.exports = {
  ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
          return next();
      }
      // Store the route the user was trying to access
      req.session.returnTo = req.originalUrl;
      res.redirect("/auth/login");
  },

  ensureAdmin: (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === "admin") {
          return next();
      }
      res.redirect("/auth/login");
  },
};
