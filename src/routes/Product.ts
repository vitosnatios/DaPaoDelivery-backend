import express from 'express';
import ProductController from '../controllers/ProductController';

export default class Product {
  private router = express.Router();
  private controller = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/get-all', this.controller.getAllProducts);
    this.router.post('/register', this.controller.registerNewProduct);
    this.router.delete('/delete', this.controller.deleteProducts);
    this.router.put('/atualizar-preco', this.controller.atualizarPreco);
  }

  public getRouter() {
    return this.router;
  }
}
