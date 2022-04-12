"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = exports.reviewSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const productSchema = joi_1.default.object({
    product: joi_1.default.object({
        title: joi_1.default.string().required(),
        price: joi_1.default.number().required().min(0),
        // image: Joi.object(),
        description: joi_1.default.string().required()
    }).required(),
    deleteImages: joi_1.default.array()
});
exports.productSchema = productSchema;
const reviewSchema = joi_1.default.object({
    review: joi_1.default.object({
        rating: joi_1.default.number().required().min(1).max(5),
        body: joi_1.default.string().required()
    }).required()
});
exports.reviewSchema = reviewSchema;
