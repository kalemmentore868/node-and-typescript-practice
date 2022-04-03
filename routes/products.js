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
const JoiSchemas_1 = require("../JoiSchemas");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
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
router.get("/", (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find({});
    res.render("products/index", { products });
})));
router.get("/new", middleware_1.isLoggedIn, (req, res) => {
    res.render("products/new");
});
router.post("/", middleware_1.isLoggedIn, validateProduct, (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.product)
        throw new ExpressError_1.default("Invalid product data", 400);
    const product = new product_1.default(req.body.product);
    yield product.save();
    req.flash("success", "Successfully made new product!");
    res.redirect(`products/${product._id}`);
})));
router.get("/:id", (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findById(id).populate("reviews");
    if (!product) {
        req.flash("error", "Cannot find that product!");
        return res.redirect("/products");
    }
    res.render("products/show", { product });
})));
router.get("/:id/edit", middleware_1.isLoggedIn, (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findById(id);
    if (!product) {
        req.flash("error", "Cannot find that product!");
        return res.redirect("/products");
    }
    res.render("products/edit", { product });
})));
router.put("/:id", middleware_1.isLoggedIn, validateProduct, (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findByIdAndUpdate(id, Object.assign({}, req.body.product));
    if (!product) {
        req.flash("error", "Cannot find that product!");
        return res.redirect("/products");
    }
    req.flash("success", "Successfully updated product!");
    res.redirect(`/products/${product._id}`);
})));
router.delete("/:id", (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield product_1.default.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted product!");
    res.redirect(`/products`);
})));
exports.default = router;
