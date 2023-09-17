import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class OrderProduct extends Model {
  id!: number;
  order_id!: number;
  product_name!: string;
  quantity!: number;
  price!: number;
}

OrderProduct.init(
  {
    order_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
  },
  {
    sequelize,
    modelName: 'order_products',
  }
);

export default OrderProduct;
