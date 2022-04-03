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
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const product_1 = __importDefault(require("../models/product"));
const review_1 = __importDefault(require("../models/review"));
const JoiSchemas_1 = require("../JoiSchemas");
const router = express_1.default.Router({ mergeParams: true });
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
router.post("/", validateReviews, (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findById(id);
    if (!product) {
        req.flash("error", "Cannot find that product!");
        return res.redirect("/products");
    }
    const review = new review_1.default(req.body.review);
    // @ts-ignore  
    product.reviews.push(review);
    yield review.save();
    yield product.save();
    req.flash("success", "Successfully made review!");
    res.redirect(`/products/${product._id}`);
})));
router.delete("/:reviewId", (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, reviewId } = req.params;
    yield product_1.default.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    yield review_1.default.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/products/${id}`);
})));
exports.default = router;
