"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
class OrdersRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new OrderController_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', this.controller.getAllActiveOrders);
        this.router.post('/register', this.controller.registerNewOrder);
        this.router.put('/update', this.controller.completeOrders);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = OrdersRoute;
