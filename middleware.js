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
exports.isReviewAuthor = exports.validateReviews = exports.validateProduct = exports.isAuthor = exports.isLoggedIn = void 0;
const ExpressError_1 = __importDefault(require("./utils/ExpressError"));
const product_1 = __importDefault(require("./models/product"));
const review_1 = __importDefault(require("./models/review"));
const JoiSchemas_1 = require("./JoiSchemas");
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "you must be signed in!");
        return res.redirect("/login");
    }
    next();
};
exports.isLoggedIn = isLoggedIn;
const validateProduct = (req, res, next) => {
    const { error } = JoiSchemas_1.productSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(err => err.message).join(',');
        throw new ExpressError_1.default(msg, 400);
    }
    else {
        next();
    }
};
exports.validateProduct = validateProduct;
const isAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findById(id);
    if (!product.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/products/${id}`);
    }
    next();
});
exports.isAuthor = isAuthor;
const isReviewAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId, id } = req.params;
    const review = yield review_1.default.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/products/${id}`);
    }
    next();
});
exports.isReviewAuthor = isReviewAuthor;
const validateReviews = (req, res, next) => {
    const { error } = JoiSchemas_1.reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(err => err.message).join(',');
        throw new ExpressError_1.default(msg, 400);
    }
    else {
        next();
    }
};
exports.validateReviews = validateReviews;
