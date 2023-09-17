import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import OrderProduct from './OrderProduct';

class Order extends Model {
  id!: number;
  date!: Date;
  closed!: boolean;
}

Order.init(
  {
    date: DataTypes.DATE,
    closed: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: 'orders',
  }
);

OrderProduct.belongsTo(Order, {
  foreignKey: 'order_id',
});

Order.hasMany(OrderProduct, {
  foreignKey: 'order_id',
});

export default Order;
