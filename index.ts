const express = require('express');
const app = express();
import Teste from './src/controllers/Teste';

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/get-active-orders', new Teste().index);

app.listen(3000, () => console.log('Server connected on port ' + port));
