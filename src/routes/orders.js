"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class OrdersRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', this.getAllActiveOrders);
    }
    getAllActiveOrders(req, res) {
        res.json({ message: 'object test' });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = OrdersRoute;
