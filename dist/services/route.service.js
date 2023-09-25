"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_route_1 = __importDefault(require("../routes/api.route"));
const routeService = (app) => {
    app.use('/api/v1', api_route_1.default);
};
exports.default = routeService;
//# sourceMappingURL=route.service.js.map