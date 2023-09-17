"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
class OrderProduct extends sequelize_1.Model {
}
OrderProduct.init({
    order_id: sequelize_1.DataTypes.INTEGER,
    product_name: sequelize_1.DataTypes.STRING,
    quantity: sequelize_1.DataTypes.INTEGER,
    price: sequelize_1.DataTypes.DECIMAL(10, 2),
}, {
    sequelize: sequelize_2.default,
    modelName: 'order_products',
});
exports.default = OrderProduct;
