"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_service_1 = __importDefault(require("./services/route.service"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
console.log(process.env);
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.APP_PORT;
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        (0, route_service_1.default)(this.app);
        this.app.use((req, res) => {
            res.status(404).json({
                status: 'Failed',
                message: 'Not found!'
            });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App start in port ${this.port}`);
        });
    }
}
const app = new App();
app.listen();
//# sourceMappingURL=app.js.map