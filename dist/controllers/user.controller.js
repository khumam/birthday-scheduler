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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const response_service_1 = require("../services/response.service");
const response_service_2 = require("../services/response.service");
const prisma = new client_1.PrismaClient();
class UserController {
}
_a = UserController;
UserController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        const response = {
            'status': 'Success',
            'data': users
        };
        return res.status(200).json(response);
    }
    catch (err) {
        return (0, response_service_2.send)(response_service_1.INTERNAL_SERVER_ERROR, err.message, res);
    }
});
UserController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: { id: req.params.id }
        });
        const response = {
            'status': 'Success',
            'data': user
        };
        return res.status(200).json(response);
    }
    catch (err) {
        return (0, response_service_2.send)(response_service_1.INTERNAL_SERVER_ERROR, err.message, res);
    }
});
UserController.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.create({
            data: {
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                birthday: req.body.birthday,
                location: req.body.location,
                timezone: req.body.timezone
            }
        });
        const user = yield prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        });
        const response = {
            'status': 'Success',
            'data': user
        };
        return res.status(200).json(response);
    }
    catch (err) {
        return (0, response_service_2.send)(response_service_1.INTERNAL_SERVER_ERROR, err.message, res);
    }
});
UserController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.update({
            where: { id: req.params.id },
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                birthday: req.body.birthday,
                location: req.body.location,
                timezone: req.body.timezone
            }
        });
        const user = yield prisma.user.findFirst({
            where: {
                id: req.params.id
            }
        });
        const response = {
            'status': 'Success',
            'data': user
        };
        return res.status(200).json(response);
    }
    catch (err) {
        return (0, response_service_2.send)(response_service_1.INTERNAL_SERVER_ERROR, err.message, res);
    }
});
UserController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.delete({
            where: {
                id: req.params.id
            }
        });
        const response = {
            'status': 'Success',
            'message': 'User deleted successfuly'
        };
        return res.status(200).json(response);
    }
    catch (err) {
        return (0, response_service_2.send)(response_service_1.INTERNAL_SERVER_ERROR, err.message, res);
    }
});
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map