"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_request_1 = require("../requests/user.request");
const timezone_controller_1 = __importDefault(require("../controllers/timezone.controller"));
const scheduler_controller_1 = __importDefault(require("../controllers/scheduler.controller"));
const apiRoute = (0, express_1.Router)();
apiRoute.get('/user', user_controller_1.default.getAll);
apiRoute.get('/user/:id', user_request_1.UserValidation, user_controller_1.default.getById);
apiRoute.post('/user/store', user_request_1.PostValidation, user_controller_1.default.store);
apiRoute.put('/user/update/:id', user_request_1.UpdateValidation, user_request_1.UserValidation, user_controller_1.default.update);
apiRoute.delete('/user/delete/:id', user_request_1.UserValidation, user_controller_1.default.delete);
apiRoute.get('/timezone', timezone_controller_1.default.getListTimezone);
apiRoute.post('/scheduler', scheduler_controller_1.default.process);
exports.default = apiRoute;
//# sourceMappingURL=api.route.js.map