import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Car } from 'src/car/entities/car.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { Contact } from 'src/contact/entities/cantact.entity';
const config: any = {
  type: 'postgres',
  database: 'testDB',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  entities: [Product, User, Car, Booking, Contact],
  synchronize: false,
  autoLoadEntities: true,
};
export default config;
