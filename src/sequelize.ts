import { Sequelize } from 'sequelize';

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  define: {
    timestamps: false,
  },
  logging: false,
});

export default sequelize;
