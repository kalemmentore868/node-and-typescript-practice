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
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("./models/product"));
const titles = ["cookies", "brownies", "cakes", "cinnabons", "gummy bears", "donuts"];
mongoose_1.default.connect("mongodb+srv://kalem868:kiojah123@cluster0.ulzyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield product_1.default.deleteMany({});
    for (let i = 0; i < 15; i++) {
        const random5 = Math.floor(Math.random() * 5);
        const prod = new product_1.default({
            author: "6249bcdff17c38f551e252b2",
            title: titles[random5],
            price: random5 * 3 + 1,
            description: "yea uk how we do it onna friday, STEAMY",
            images: [
                { url: "https://res.cloudinary.com/dbpnbpuel/image/upload/v1636417611/o36dhxgmdahwzvhyzzww.jpg",
                    filename: "SafeSell/msts7utt9ym5twf8efn2" },
                {
                    url: " https://res.cloudinary.com/dbpnbpuel/image/upload/v1649280931/SafeSell/nvmqxbu0bcb23ztgbxuu.jpg",
                    filename: "nvmqxbu0bcb23ztgbxuu"
                }
            ]
        });
        yield prod.save();
    }
});
seedDB().then(() => {
    mongoose_1.default.connection.close();
});
