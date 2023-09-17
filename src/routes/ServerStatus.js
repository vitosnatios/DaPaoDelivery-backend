"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ServerStatusController_1 = __importDefault(require("../controllers/ServerStatusController"));
class ServerStatus {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new ServerStatusController_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', this.controller.getServerStatus);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = ServerStatus;
