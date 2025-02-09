const passport = require("passport");

const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash("error", info.message);
            return res.redirect("/auth/login");
        }

        req.logIn(user, (err) => {
            if (err) return next(err);

            // Redirect to the original page or default to "/admin"
            const redirectUrl = req.session.returnTo || "/admin";
            delete req.session.returnTo; // Clear after redirect
            res.redirect(redirectUrl);
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout(() => {
        res.redirect("/auth/login");
    });
};

module.exports = { login, logout };
