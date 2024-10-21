"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
exports.getError = getError;
// packages
var client_1 = require("@prisma/client");
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    function ClientError(_code, _message) {
        var _this = _super.call(this, _message) || this;
        _this.code = _code;
        Object.setPrototypeOf(_this, ClientError.prototype); // This is have type safety when creating instances
        return _this;
    }
    return ClientError;
}(Error));
exports.ClientError = ClientError;
function getError(err) {
    var message, status, responseCode;
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = 'Provided fields:' + err.meta.target + ' already exists';
        }
        else if (err.code === 'P2025') {
            message = 'Record not found.';
        }
        else if (err.code === 'P2014') {
            message = 'Foreign key constraint failed.';
        }
        else if (err.code === 'P2003') {
            message = 'Required field missing.';
        }
        else if (err.code === 'P1012') {
            message = err.message;
        }
        else {
            message = 'An unknown error occurred:';
        }
        status = 400;
        responseCode = 2;
    }
    else if (err instanceof ClientError) {
        status = 400;
        message = err.message;
        responseCode = err.code;
    }
    else {
        status = 500;
        message = err.message;
        responseCode = 0;
    }
    return {
        failure: { responseCode: responseCode, message: message },
        status: status
    };
}
