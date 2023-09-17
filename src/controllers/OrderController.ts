import { Request, Response } from 'express';
import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';

export default class OrderController {
  async getAllActiveOrders(req: Request, res: Response) {
    try {
      const activeOrders = await Order.findAll({
        where: { closed: false },
        include: [OrderProduct],
      });

      res.json(activeOrders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An error occurred while fetching active orders.' });
    }
  }
}
