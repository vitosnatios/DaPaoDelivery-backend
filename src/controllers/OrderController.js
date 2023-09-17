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
const Order_1 = __importDefault(require("../models/Order"));
const OrderProduct_1 = __importDefault(require("../models/OrderProduct"));
const Product_1 = __importDefault(require("../models/Product"));
const sequelize_1 = __importDefault(require("../sequelize"));
class OrderController {
    getAllActiveOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activeOrders = yield Order_1.default.findAll({
                    where: { closed: false },
                    include: [OrderProduct_1.default],
                });
                res.json(activeOrders);
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ message: 'An error occurred while fetching active orders.' });
            }
        });
    }
    registerNewOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { order_products } = req.body;
                const currentDate = new Date().toISOString();
                const transaction = yield sequelize_1.default.transaction();
                const newOrder = yield Order_1.default.create({
                    date: currentDate,
                    closed: false,
                }, { transaction });
                const productIds = order_products.map((product) => product.id);
                const products = yield Product_1.default.findAll({
                    where: {
                        id: productIds,
                    },
                });
                const productStockMap = new Map();
                products.forEach((product) => {
                    productStockMap.set(product.id, Number(product.stock));
                });
                const productQuantity = new Map();
                for (const product of order_products) {
                    if (!productStockMap.has(product.id) ||
                        productStockMap.get(product.id) < Number(product.quantity)) {
                        yield transaction.rollback();
                        return res.status(400).json({ message: 'Product out of stock' });
                    }
                    productQuantity.set(product.id, product.quantity);
                    const currentStock = productStockMap.get(product.id);
                    const purchased = Number(product.quantity);
                    yield OrderProduct_1.default.create({
                        product_name: product.product_name,
                        quantity: purchased,
                        price: product.price,
                        order_id: newOrder.id,
                    }, { transaction });
                    productStockMap.set(product.id, currentStock - purchased);
                }
                for (const [productId, purchased] of productStockMap) {
                    if (productQuantity.has(productId)) {
                        yield Product_1.default.update({
                            stock: purchased,
                            purchased: sequelize_1.default.literal(`purchased + ${productQuantity.get(productId)}`),
                        }, { where: { id: productId }, transaction });
                    }
                }
                yield transaction.commit();
                const responseOrder = {
                    id: newOrder.id,
                    date: newOrder.date,
                    closed: newOrder.closed,
                    order_products: order_products.map(({ id, product_name, quantity, price }) => ({
                        id,
                        product_name,
                        quantity,
                        price,
                    })),
                };
                res.status(201).json(responseOrder);
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ message: 'Error trying to register the new order.' });
            }
        });
    }
}
exports.default = OrderController;
