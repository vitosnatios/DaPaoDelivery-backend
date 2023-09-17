"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
const OrderProduct_1 = __importDefault(require("./OrderProduct"));
class Order extends sequelize_1.Model {
}
Order.init({
    date: sequelize_1.DataTypes.DATE,
    closed: sequelize_1.DataTypes.BOOLEAN,
}, {
    sequelize: sequelize_2.default,
    modelName: 'orders',
});
OrderProduct_1.default.belongsTo(Order, {
    foreignKey: 'order_id',
});
Order.hasMany(OrderProduct_1.default, {
    foreignKey: 'order_id',
});
exports.default = Order;
