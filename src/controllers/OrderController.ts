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
  closed: boolean;
}

export default class OrderController {
  async getAllOrders() {}

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
        { date: currentDate, closed: false },
        { transaction }
      );

      const productIds = order_products.map((product) => product.id);

      const products = await Product.findAll({ where: { id: productIds } });
      const productStockMap = new Map(
        products.map((product) => [product.id, Number(product.stock)])
      );

      const productQuantity = new Map();

      for (const product of order_products) {
        const productId = product.id;
        const currentStock = productStockMap.get(Number(productId));
        const purchased = Number(product.quantity);

        if (!currentStock || currentStock < purchased) {
          await transaction.rollback();
          return res.status(400).json({
            message: `Product with id: "${product.id}" out of stock. ${currentStock} left on stock`,
          });
        }

        productQuantity.set(productId, purchased);

        await OrderProduct.create(
          {
            product_name: product.product_name,
            quantity: purchased,
            price: product.price,
            order_id: newOrder.id,
          },
          { transaction }
        );

        const newStock = currentStock - purchased;
        await Product.update(
          {
            stock: newStock,
            purchased: sequelize.literal(`purchased + ${purchased}`),
          },
          { where: { id: productId }, transaction }
        );
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

  async completeOrders(req: Request, res: Response) {
    try {
      const { orderIds }: { orderIds: number[] } = req.body;

      for (const orderId of orderIds) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Item não encontrado.');
        if (
          typeof order === 'object' &&
          '_previousDataValues' in order &&
          order._previousDataValues &&
          typeof order._previousDataValues === 'object' &&
          'closed' in order._previousDataValues &&
          order._previousDataValues.closed
        )
          throw new Error('Encomenda já foi realizada.');
        if (order) {
          await order.update({ closed: true });
        }
      }
      res
        .status(200)
        .json({ message: 'Orders marked as completed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error completing orders' });
    }
  }
}
