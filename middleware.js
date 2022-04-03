"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "you must be signed in!");
        return res.redirect("/login");
    }
    next();
};
exports.isLoggedIn = isLoggedIn;
