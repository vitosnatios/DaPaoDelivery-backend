"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const OrdersRoute_1 = __importDefault(require("./routes/OrdersRoute"));
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/orders', new OrdersRoute_1.default().getRouter());
app.listen(3000, () => console.log('Server connected on port ' + port));