"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const reviews_1 = require("../controllers/reviews");
const router = express_1.default.Router({ mergeParams: true });
router.post("/", middleware_1.validateReviews, middleware_1.isLoggedIn, reviews_1.makeNewReview);
router.delete("/:reviewId", middleware_1.isLoggedIn, middleware_1.isReviewAuthor, reviews_1.deleteReview);
exports.default = router;
