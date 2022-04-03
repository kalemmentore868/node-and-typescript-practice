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
const express_1 = __importDefault(require("express"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const User = require("../models/user");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/register", (req, res) => {
    res.render("users/register");
});
router.post("/register", (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        const user = new User({ email, username });
        const registeredUser = yield User.register(user, password);
        req.flash("success", "Welcome to SafeSell!");
        res.redirect("/products");
    }
    catch (e) {
        console.log(e);
        req.flash("error", e);
        res.redirect("/register");
    }
})));
router.get("/login", (req, res) => {
    res.render("users/login");
});
router.post("/login", passport_1.default.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    req.flash("success", "welcome back");
    res.redirect("/products");
});
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "yuh outside literally");
    res.redirect("/products");
});
exports.default = router;
