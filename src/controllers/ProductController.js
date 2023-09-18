"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
class ProductController {
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield Product_1.default.findAll();
                res.json(products);
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ message: 'An error occurred while fetching active orders.' });
            }
        });
    }
    registerNewProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, stock } = req.body;
                if (isNaN(price) || isNaN(price)) {
                    throw new Error('Preencha corretamente.');
                }
                if (!name.trim() || !price.trim() || !stock.trim()) {
                    return res
                        .status(400)
                        .json({ message: 'Por favor, preencha todos campos.' });
                }
                const existingProduct = yield Product_1.default.findOne({ where: { name } });
                if (existingProduct) {
                    return res
                        .status(400)
                        .json({ message: 'Já existe um produto com esse nome.' });
                }
                const newProduct = yield Product_1.default.create({
                    name,
                    price,
                    stock,
                    purchased: 0,
                });
                res.status(201).json({
                    message: 'Registrado com sucesso.',
                    // product: newProduct,
                });
            }
            catch (error) {
                console.error(error);
                const message = error instanceof Error ? error.message : 'Algo deu errado.';
                res.status(500).json({ message: message });
            }
        });
    }
    deleteProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productIds = req.body;
                if (!Array.isArray(productIds) || productIds.length === 0) {
                    return res.status(400).json({ message: 'Algum id está inválido.' });
                }
                if (!productIds.length)
                    throw new Error('Selecione algum produto.');
                yield Product_1.default.destroy({
                    where: {
                        id: productIds,
                    },
                });
                res.status(200).json({ message: 'Products deleted successfully' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error deleting products' });
            }
        });
    }
}
exports.default = ProductController;
