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
const moment_1 = __importDefault(require("moment"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const client_1 = require("@prisma/client");
const email_service_1 = require("../services/email.service");
const prisma = new client_1.PrismaClient({
    log: ['query'],
});
class SchedulerController {
}
_a = SchedulerController;
SchedulerController.process = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const target = (0, moment_1.default)((0, moment_1.default)().format('YYYY-MM-DD'), 'YYYY-MM-DD HH:mm:ss');
        const timezones = moment_timezone_1.default.tz.names();
        const matchingTimezones = [];
        const matchingMonth = [];
        const matchingDay = [];
        for (const timezone of timezones) {
            const momentInTimezone = moment_timezone_1.default.tz(target.format(), timezone);
            if (momentInTimezone.format('HH:mm:ss') == '09:00:00') {
                matchingTimezones.push(timezone);
                matchingMonth.push(momentInTimezone.format('MM'));
                matchingDay.push(momentInTimezone.format('DD'));
            }
        }
        const userWhoBirthdayToday = yield prisma.$queryRaw(client_1.Prisma.sql `SELECT * FROM User WHERE MONTH(birthday) IN (${client_1.Prisma.join(matchingMonth)}) AND DAY(birthday) IN (${client_1.Prisma.join(matchingDay)}) AND timezone IN (${client_1.Prisma.join(matchingTimezones)})`);
        userWhoBirthdayToday.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
            const sent = yield (0, email_service_1.sendEmail)(user);
        }));
        const response = {
            timezone: matchingTimezones,
            user: userWhoBirthdayToday
        };
        return res.status(response_service_1.SUCCESS).json(response);
    }
    catch (err) {
        return (0, response_service_2.send)(response_service_1.INTERNAL_SERVER_ERROR, err.message, res);
    }
});
exports.default = SchedulerController;
//# sourceMappingURL=scheduler.controller.js.map