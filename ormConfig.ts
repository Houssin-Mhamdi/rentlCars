import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Car } from 'src/car/entities/car.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { Contact } from 'src/contact/entities/cantact.entity';
const config: any = {
  type: 'postgres',
  host: 'dpg-ct72tplds78s73bc6je0-a.oregon-postgres.render.com', // Updated host
  port: 5432,
  username: 'car_rent_jizy_user',
  password: 'ewW8CXozwK7g38jkY05V4NcWQgA0ha3d',
  database: 'car_rent_jizy',
  entities: [Product, User, Car, Booking, Contact],
  synchronize: true,
  autoLoadEntities: true,
  ssl: {
    rejectUnauthorized: false, // Required for many cloud-hosted Postgres databases
  },
};
export default config;
