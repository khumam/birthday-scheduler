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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.UpdateValidation = exports.PostValidation = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const PostValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = [];
    if (req.body.username.length < 6 || req.body.username.length > 48) {
        errors.push('Username length should be not less than 6 chars and not more than 48 chars.');
    }
    if (req.body.first_name.length < 5 || req.body.first_name.length > 44) {
        errors.push('First name length should be not less than 5 chars and not more than 44 chars.');
    }
    if (req.body.last_name.length > 55) {
        errors.push('Last name length should be not more than 55 chars.');
    }
    if ((yield prisma.user.findFirst({ where: { username: req.body.username } })) != null) {
        errors.push('Username exists');
    }
    if (errors.length > 0) {
        const response = {
            status: 'Failed',
            message: errors
        };
        return res.status(400).json(response);
    }
    next();
});
exports.PostValidation = PostValidation;
const UpdateValidation = (req, res, next) => {
    let errors = [];
    if (req.body.username) {
        errors.push('Username should be not updated.');
    }
    if (req.body.first_name.length < 5 || req.body.first_name.length > 44) {
        errors.push('First name length should be not less than 5 chars and not more than 44 chars.');
    }
    if (req.body.last_name.length > 55) {
        errors.push('Last name length should be not more than 55 chars.');
    }
    if (errors.length > 0) {
        const response = {
            status: 'Failed',
            message: errors
        };
        return res.status(400).json(response);
    }
    next();
};
exports.UpdateValidation = UpdateValidation;
const UserValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({ where: { id: req.params.id } });
    if (user == null) {
        const response = {
            status: 'Failed',
            message: 'User does not exists'
        };
        return res.status(400).json(response);
    }
    next();
});
exports.UserValidation = UserValidation;
//# sourceMappingURL=user.request.js.map