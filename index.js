"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const Teste_1 = __importDefault(require("./src/controllers/Teste"));
const port = process.env.PORT || 3000;
app.use(express.json());
app.get('/get-active-orders', new Teste_1.default().index);
app.listen(3000, () => console.log('Server connected on port ' + port));
