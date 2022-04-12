"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.renderLoginForm = exports.registerUser = exports.renderResgistrationForm = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const User = require("../models/user");
const renderResgistrationForm = (req, res) => {
    res.render("users/register");
};
exports.renderResgistrationForm = renderResgistrationForm;
const registerUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        const user = new User({ email, username });
        const registeredUser = yield User.register(user, password);
        req.login(registeredUser, err => {
            if (err)
                return next(err);
        });
        req.flash("success", "Welcome to SafeSell!");
        res.redirect("/products");
    }
    catch (e) {
        console.log(e);
        req.flash("error", e);
        res.redirect("/register");
    }
}));
exports.registerUser = registerUser;
const renderLoginForm = (req, res) => {
    res.render("users/login");
};
exports.renderLoginForm = renderLoginForm;
const loginUser = (req, res) => {
    req.flash("success", "welcome back");
    const redirectUrl = req.session.returnTo || "/products";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};
exports.loginUser = loginUser;
const logoutUser = (req, res) => {
    req.logout();
    req.flash("success", "yuh outside literally");
    res.redirect("/products");
};
exports.logoutUser = logoutUser;
