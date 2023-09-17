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
  }

  public getRouter() {
    return this.router;
  }
}
