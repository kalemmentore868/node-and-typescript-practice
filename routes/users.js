"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
router.route("/register")
    .get(users_1.renderResgistrationForm)
    .post(users_1.registerUser);
router.route("/login")
    .get(users_1.renderLoginForm)
    .post(passport_1.default.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users_1.loginUser);
router.get("/logout", users_1.logoutUser);
exports.default = router;
