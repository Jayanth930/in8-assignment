"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("dotenv/config");
var crudRouter_1 = __importDefault(require("./controllers/crudRouter"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3501;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api/v1", crudRouter_1.default);
app.listen(port, function () {
    console.log("server started on port : ".concat(port));
});
