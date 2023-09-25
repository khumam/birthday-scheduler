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
exports.sendEmail = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = "https://email-service.digitalenvision.com.au/send-email";
const sendEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        email: user.email,
        message: `Hi ${user.first_name} ${user.last_name} it is your birthday!`
    };
    const res = yield axios_1.default.post(BASE_URL, body);
    return res;
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.service.js.map