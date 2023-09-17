import { Request, Response } from 'express';
import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';
import Product from '../models/Product';
import sequelize from '../sequelize';

export interface IOrderProduct {
  id?: number;
  product_name: string;
  quantity: string;
  price: number;
}

export interface IOrder {
  order_products: IOrderProduct[];
  date: string;
  totalPrice?: number;
  closed: false;
}

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

  async registerNewOrder(req: Request, res: Response) {
    try {
      const { order_products }: { order_products: IOrderProduct[] } = req.body;
      const currentDate = new Date().toISOString();
      const transaction = await sequelize.transaction();
      const newOrder = await Order.create(
        {
          date: currentDate,
          closed: false,
        },
        { transaction }
      );
      const productIds = order_products.map((product) => product.id);
      const products = await Product.findAll({
        where: {
          id: productIds,
        },
      });
      const productStockMap = new Map();
      products.forEach((product) => {
        productStockMap.set(product.id, Number(product.stock));
      });

      const productQuantity = new Map();
      for (const product of order_products) {
        if (
          !productStockMap.has(product.id) ||
          productStockMap.get(product.id) < Number(product.quantity)
        ) {
          await transaction.rollback();
          return res.status(400).json({ message: 'Product out of stock' });
        }
        productQuantity.set(product.id, product.quantity);
        const currentStock = productStockMap.get(product.id);
        const purchased = Number(product.quantity);
        await OrderProduct.create(
          {
            product_name: product.product_name,
            quantity: purchased,
            price: product.price,
            order_id: newOrder.id,
          },
          { transaction }
        );
        productStockMap.set(product.id, currentStock - purchased);
      }
      for (const [productId, purchased] of productStockMap) {
        if (productQuantity.has(productId)) {
          await Product.update(
            {
              stock: purchased,
              purchased: sequelize.literal(
                `purchased + ${productQuantity.get(productId)}`
              ),
            },
            { where: { id: productId }, transaction }
          );
        }
      }
      await transaction.commit();
      const responseOrder = {
        id: newOrder.id,
        date: newOrder.date,
        closed: newOrder.closed,
        order_products: order_products.map(
          ({ id, product_name, quantity, price }) => ({
            id,
            product_name,
            quantity,
            price,
          })
        ),
      };
      res.status(201).json(responseOrder);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Error trying to register the new order.' });
    }
  }
}
