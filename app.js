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
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("./models/product"));
mongoose_1.default.connect("mongodb+srv://kalem868:kiojah123@cluster0.ulzyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.get('/', (req, res) => {
    res.render("home");
});
app.get('/makeproduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prod = new product_1.default({ title: "brownie", price: 50 });
    yield prod.save();
    res.send(prod);
}));
app.listen(3000, () => {
    console.log("Serving on port 3000...");
});
