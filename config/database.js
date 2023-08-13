import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();


const DB_NAME = process.env.DATABASE_NAME;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_PORT = process.env.DATABASE_PORT;
const DB_HOST = process.env.DATABASE_HOST;
const DB_USER = process.env.DATABASE_USER;
const IS_PRODUCTION = process.env.IS_PRODUCTION === 'true'; // Converted string value to a boolean



let sequelizeOptions = {
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
};

if (IS_PRODUCTION) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(sequelizeOptions);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

export default sequelize;