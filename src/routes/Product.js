"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
class Product {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new ProductController_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/get-all', this.controller.getAllProducts);
        this.router.post('/register', this.controller.registerNewProduct);
        this.router.delete('/delete', this.controller.deleteProducts);
        this.router.put('/atualizar-preco', this.controller.atualizarPreco);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = Product;
