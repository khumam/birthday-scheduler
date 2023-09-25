"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.SUCCESS = exports.NOT_FOUND = exports.BAD_REQUEST = exports.INTERNAL_SERVER_ERROR = void 0;
exports.INTERNAL_SERVER_ERROR = 500;
exports.BAD_REQUEST = 400;
exports.NOT_FOUND = 404;
exports.SUCCESS = 200;
const send = (code, message, res) => {
    const response = {
        'message': message
    };
    return res.status(code).json(response);
};
exports.send = send;
//# sourceMappingURL=response.service.js.map