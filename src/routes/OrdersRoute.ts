import express from 'express';
import OrderController from '../controllers/OrderController';

export default class OrdersRoute {
  private router = express.Router();
  private controller = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.controller.getAllActiveOrders);
    this.router.post('/register', this.controller.registerNewOrder);
  }

  public getRouter() {
    return this.router;
  }
}
