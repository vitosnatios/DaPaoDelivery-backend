import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Product extends Model {
  id!: number;
  name!: string;
  price!: number;
  stock!: number;
  purchased!: number;
}

Product.init(
  {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    stock: DataTypes.INTEGER,
    purchased: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  }
);

export default Product;
