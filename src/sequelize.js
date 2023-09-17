"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    define: {
        timestamps: false,
    },
    logging: false,
});
exports.default = sequelize;
