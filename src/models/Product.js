"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
class Product extends sequelize_1.Model {
}
Product.init({
    name: sequelize_1.DataTypes.STRING,
    price: sequelize_1.DataTypes.DECIMAL(10, 2),
    stock: sequelize_1.DataTypes.INTEGER,
    purchased: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: sequelize_2.default,
    modelName: 'Product',
    tableName: 'products',
});
exports.default = Product;
