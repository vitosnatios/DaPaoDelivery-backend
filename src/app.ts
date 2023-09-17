require('dotenv').config();
import OrdersRoute from './routes/OrdersRoute';
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/orders', new OrdersRoute().getRouter());

app.listen(3000, () => console.log('Server connected on port ' + port));
