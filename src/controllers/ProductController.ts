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
        .json({ message: 'Houve algum erro ao baixar as encomendas ativas.' });
    }
  }

  async registerNewProduct(req: Request, res: Response) {
    try {
      const { name, price, stock } = req.body;
      if (isNaN(price) || isNaN(price)) {
        throw new Error('Preencha corretamente.');
      }
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

  async deleteProducts(req: Request, res: Response) {
    try {
      const productIds = req.body;
      if (!Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ message: 'Algum id está inválido.' });
      }
      if (!productIds.length) throw new Error('Selecione algum produto.');
      await Product.destroy({
        where: {
          id: productIds,
        },
      });
      res.status(200).json({ message: 'Produtos deletados com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar produtos.' });
    }
  }

  async atualizarPreco(req: Request, res: Response) {
    try {
      const priceUpdates: Record<string, number> = req.body;
      if (!priceUpdates || Object.keys(priceUpdates).length === 0) {
        return res.status(400).json({ message: 'Input inválido.' });
      }
      const productIds = Object.keys(priceUpdates).map((key) =>
        parseInt(key, 10)
      );
      const products = await Product.findAll({
        where: { id: productIds },
      });
      await Promise.all(
        products.map(async (product) => {
          const updatedPrice = priceUpdates[product.id];
          if (updatedPrice !== undefined) {
            product.price = parseFloat(updatedPrice.toFixed(2));
            await product.save();
          }
        })
      );
      res.status(200).json({ message: 'Preço(s) atualizado(s) com sucesso.' });
    } catch (error: unknown) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Houve algum problema ao atuaizar os preços.' });
    }
  }
}
