"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = __importDefault(require("./src/routes/orders"));
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/orders', new orders_1.default().getRouter());
app.listen(3000, () => console.log('Server connected on port ' + port));
