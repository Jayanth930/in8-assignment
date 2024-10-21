"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.delteUser = delteUser;
// packages
var client_1 = require("@prisma/client");
var ErrorHandler_1 = require("./ErrorHandler");
var utils_1 = require("./utils");
var prisma = new client_1.PrismaClient();
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadDTO, password, dateOfBirth, phoneNo, hash, user, error_1, _a, status_1, failure;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    uploadDTO = req.body;
                    password = uploadDTO.password, dateOfBirth = uploadDTO.dateOfBirth, phoneNo = uploadDTO.phoneNo;
                    if (new Date(dateOfBirth) > new Date()) {
                        throw new ErrorHandler_1.ClientError(5, "Please provide valid date-of-birth");
                    }
                    else if (phoneNo.length < 7) {
                        throw new ErrorHandler_1.ClientError(6, "phoneNo cannot be Less that 7 characters");
                    }
                    return [4 /*yield*/, (0, utils_1.gethashedPassword)(password)];
                case 1:
                    hash = _b.sent();
                    return [4 /*yield*/, prisma.registration.create({
                            data: __assign(__assign({}, uploadDTO), { password: hash, dateOfBirth: new Date(dateOfBirth) // Even if its a string it will not cause any error.
                             })
                        })];
                case 2:
                    user = _b.sent();
                    res.status(201).json({ responseCode: 1, message: "Successfully created user", data: user });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    _a = (0, ErrorHandler_1.getError)(error_1), status_1 = _a.status, failure = _a.failure;
                    res.status(status_1).json(failure);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, user, error_2, _a, status_2, failure;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    email = req.params.email;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.registration.findUnique({
                            where: {
                                email: email
                            },
                            select: {
                                id: true, firstName: true, lastName: true, dateOfBirth: true, createdAt: true, linkedInUrl: true, gitHubLink: true
                            }
                        })];
                case 2:
                    user = _b.sent();
                    if (!user)
                        throw new ErrorHandler_1.ClientError(401, "Email not found");
                    res.status(200).json({ responseCode: 1, message: "successfully fetched user", data: user });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    _a = (0, ErrorHandler_1.getError)(error_2), status_2 = _a.status, failure = _a.failure;
                    res.status(status_2).json(failure);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, updateDTO, dateOfBirth, phoneNo, password, hash, updatedUser, error_3, _a, status_3, failure;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    updateDTO = req.body;
                    dateOfBirth = updateDTO.dateOfBirth, phoneNo = updateDTO.phoneNo, password = updateDTO.password;
                    if (!(dateOfBirth && new Date(dateOfBirth) > new Date())) return [3 /*break*/, 1];
                    throw new ErrorHandler_1.ClientError(5, "Please provide valid date-of-birth");
                case 1:
                    if (!(phoneNo && phoneNo.length < 7)) return [3 /*break*/, 2];
                    throw new ErrorHandler_1.ClientError(6, "phoneNo cannot be Less that 7 characters");
                case 2:
                    _b.trys.push([2, 7, , 8]);
                    if (!password) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, utils_1.gethashedPassword)(password)];
                case 3:
                    hash = _b.sent();
                    updateDTO = __assign(__assign({}, updateDTO), { password: hash });
                    return [3 /*break*/, 5];
                case 4:
                    if (dateOfBirth) {
                        updateDTO = __assign(__assign({}, updateDTO), { dateOfBirth: new Date(dateOfBirth) });
                    }
                    _b.label = 5;
                case 5: return [4 /*yield*/, prisma.registration.update({
                        where: { id: id },
                        data: __assign({}, updateDTO),
                        select: {
                            firstName: true, lastName: true, dateOfBirth: true, createdAt: true, linkedInUrl: true, gitHubLink: true
                        }
                    })];
                case 6:
                    updatedUser = _b.sent();
                    res.status(200).json({ responseCode: 1, message: "Successfully updated user", data: updatedUser });
                    return [3 /*break*/, 8];
                case 7:
                    error_3 = _b.sent();
                    _a = (0, ErrorHandler_1.getError)(error_3), status_3 = _a.status, failure = _a.failure;
                    res.status(status_3).json(failure);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function delteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, error_4, _a, status_4, failure;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.registration.delete({
                            where: { id: id }
                        })];
                case 2:
                    user = _b.sent();
                    if (user)
                        res.status(200).json({ responseCode: 1, message: "Successfully deleted the user" });
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    _a = (0, ErrorHandler_1.getError)(error_4), status_4 = _a.status, failure = _a.failure;
                    res.status(status_4).json(failure);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
