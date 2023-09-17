import { Request, Response } from 'express';
import Product from '../models/Product';

export default class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An error occurred while fetching active orders.' });
    }
  }
}
