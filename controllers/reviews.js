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
exports.deleteReview = exports.makeNewReview = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const product_1 = __importDefault(require("../models/product"));
const review_1 = __importDefault(require("../models/review"));
const makeNewReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findById(id);
    if (!product) {
        req.flash("error", "Cannot find that product!");
        return res.redirect("/products");
    }
    const review = new review_1.default(req.body.review);
    review.author = req.user._id;
    product.reviews.push(review);
    yield review.save();
    yield product.save();
    req.flash("success", "Successfully made review!");
    res.redirect(`/products/${product._id}`);
}));
exports.makeNewReview = makeNewReview;
const deleteReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, reviewId } = req.params;
    yield product_1.default.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    yield review_1.default.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/products/${id}`);
}));
exports.deleteReview = deleteReview;
