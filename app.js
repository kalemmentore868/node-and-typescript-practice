"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const method_override_1 = __importDefault(require("method-override"));
const ejsMate = require("ejs-mate");
const ExpressError_1 = __importDefault(require("./utils/ExpressError"));
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const passport_1 = __importDefault(require("passport"));
const localStrategy = require("passport-local");
const User = require("./models/user");
const users_1 = __importDefault(require("./routes/users"));
const products_1 = __importDefault(require("./routes/products"));
const review_1 = __importDefault(require("./routes/review"));
mongoose_1.default.connect("mongodb+srv://kalem868:kiojah123@cluster0.ulzyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const app = (0, express_1.default)();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, method_override_1.default)("_method"));
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'dist/public')));
const sessionConfig = {
    secret: "cyaseeme",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use((0, express_session_1.default)(sessionConfig));
app.use((0, connect_flash_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new localStrategy(User.authenticate()));
passport_1.default.serializeUser(User.serializeUser());
passport_1.default.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
app.use("/", users_1.default);
app.use("/products", products_1.default);
app.use("/products/:id/reviews", review_1.default);
app.get('/', (req, res) => {
    res.render("home");
});
app.all("*", (req, res, next) => {
    next(new ExpressError_1.default("Page not Found", 404));
});
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "summin nuh right";
    res.status(statusCode).render("error", { err });
});
app.listen(3000, () => {
    console.log("Serving on port 3000...");
});
