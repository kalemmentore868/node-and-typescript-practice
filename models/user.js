"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
//adds password and a username that can't be duplicated and some extra methods
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose_1.default.model("User", UserSchema);
