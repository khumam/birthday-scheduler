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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const response_service_1 = require("../services/response.service");
const response_service_2 = require("../services/response.service");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class TimezoneController {
}
_a = TimezoneController;
TimezoneController.getListTimezone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = {
            status: 'Success',
            data: moment_timezone_1.default.tz.names()
        };
        return res.status(response_service_1.SUCCESS).json(response);
    }
    catch (err) {
        return (0, response_service_2.send)(response_service_1.INTERNAL_SERVER_ERROR, err.message, res);
    }
});
exports.default = TimezoneController;
//# sourceMappingURL=timezone.controller.js.map