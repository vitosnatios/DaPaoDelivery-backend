const express = require('express');
const app = express();
var cors = require('cors');
require('dotenv').config();
import OrdersRoute from './routes/OrdersRoute';
import Product from './routes/Product';
import ServerStatus from './routes/ServerStatus';

const port = process.env.PORT || 3000;

var corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/server-status', new ServerStatus().getRouter());
app.use('/api/orders', new OrdersRoute().getRouter());
app.use('/api/product', new Product().getRouter());

app.listen(3000, () => console.log('Server connected on port ' + port));

export default app;
