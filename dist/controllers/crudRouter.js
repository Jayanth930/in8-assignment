"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var crudProvider_1 = require("../services/crudProvider");
var router = express_1.default.Router();
router.post("/user/register", crudProvider_1.createUser);
router.get("/user/:email", crudProvider_1.getUser);
router.put("/user/:id", crudProvider_1.updateUser);
router.delete("/user/:id", crudProvider_1.delteUser);
exports.default = router;
