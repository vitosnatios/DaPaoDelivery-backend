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

  async registerNewProduct(req: Request, res: Response) {
    try {
      const { name, price, stock } = req.body;
      if (!name.trim() || !price.trim() || !stock.trim()) {
        return res
          .status(400)
          .json({ message: 'Por favor, preencha todos campos.' });
      }
      const existingProduct = await Product.findOne({ where: { name } });
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: 'Já existe um produto com esse nome.' });
      }
      const newProduct = await Product.create({
        name,
        price,
        stock,
        purchased: 0,
      });
      res.status(201).json({
        message: 'Registrado com sucesso.',
        product: newProduct,
      });
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : 'Algo deu errado.';
      res.status(500).json({ message: message });
    }
  }
}
