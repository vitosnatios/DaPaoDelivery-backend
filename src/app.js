"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
var cors = require('cors');
require('dotenv').config();
const OrdersRoute_1 = __importDefault(require("./routes/OrdersRoute"));
const Product_1 = __importDefault(require("./routes/Product"));
const ServerStatus_1 = __importDefault(require("./routes/ServerStatus"));
const port = process.env.PORT || 3000;
var corsOptions = {
    origin: process.env.FRONTEND_BASE_URL,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/server-status', new ServerStatus_1.default().getRouter());
app.use('/api/orders', new OrdersRoute_1.default().getRouter());
app.use('/api/product', new Product_1.default().getRouter());
app.listen(3000, () => console.log('Server connected on port ' + port));
