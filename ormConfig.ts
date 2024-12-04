import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Car } from 'src/car/entities/car.entity';
const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'testDB',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  entities: [Product, User, Car],
  synchronize: true,
};
export default config;
