import express, { Request, Response } from 'express';

class OrdersRoute {
  private router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.getAllActiveOrders);
  }

  private getAllActiveOrders(req: Request, res: Response) {
    res.json({ message: 'object test' });
  }

  public getRouter() {
    return this.router;
  }
}

export default OrdersRoute;
