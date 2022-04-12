"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const products_1 = require("../controllers/products");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const router = express_1.default.Router();
router.route("/")
    .get(products_1.index)
    .post(middleware_1.isLoggedIn, upload.array("image"), middleware_1.validateProduct, products_1.makeNewProduct);
router.get("/new", middleware_1.isLoggedIn, products_1.renderNewProductForm);
router.route("/:id")
    .get(products_1.renderShowPage)
    .put(middleware_1.isLoggedIn, middleware_1.isAuthor, upload.array("image"), middleware_1.validateProduct, products_1.editProduct)
    .delete(middleware_1.isLoggedIn, middleware_1.isAuthor, products_1.deleteProduct);
router.get("/:id/edit", middleware_1.isLoggedIn, middleware_1.isAuthor, products_1.renderEditForm);
exports.default = router;
