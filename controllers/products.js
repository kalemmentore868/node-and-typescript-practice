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
exports.deleteProduct = exports.editProduct = exports.renderEditForm = exports.renderShowPage = exports.makeNewProduct = exports.renderNewProductForm = exports.index = void 0;
const product_1 = __importDefault(require("../models/product"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const { cloudinary } = require("../cloudinary");
const index = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find({});
    res.render("products/index", { products });
}));
exports.index = index;
const renderNewProductForm = (req, res) => {
    res.render("products/new");
};
exports.renderNewProductForm = renderNewProductForm;
const makeNewProduct = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.product)
        throw new ExpressError_1.default("Invalid product data", 400);
    const product = new product_1.default(req.body.product);
    product.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    product.author = req.user._id;
    yield product.save();
    console.log(product);
    req.flash("success", "Successfully made new product!");
    res.redirect(`products/${product._id}`);
}));
exports.makeNewProduct = makeNewProduct;
const renderShowPage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!product) {
        req.flash("error", "Cannot find that product!");
        return res.redirect("/products");
    }
    res.render("products/show", { product });
}));
exports.renderShowPage = renderShowPage;
const renderEditForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findById(id);
    if (!product) {
        req.flash("error", "Cannot find that product!");
        return res.redirect("/products");
    }
    res.render("products/edit", { product });
}));
exports.renderEditForm = renderEditForm;
const editProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    console.log(imgs);
    const product = yield product_1.default.findByIdAndUpdate(id, Object.assign({}, req.body.product));
    if (!product) {
        req.flash("error", "Cannot find that product!");
        return res.redirect("/products");
    }
    product.images.push(...imgs);
    yield product.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            yield cloudinary.uploader.destroy(filename);
        }
        yield product.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash("success", "Successfully updated product!");
    res.redirect(`/products/${product._id}`);
}));
exports.editProduct = editProduct;
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield product_1.default.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted product!");
    res.redirect(`/products`);
}));
exports.deleteProduct = deleteProduct;
