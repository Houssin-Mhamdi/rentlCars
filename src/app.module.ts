import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import config from '../ormconfig';
@Module({
  imports: [ProductModule, TypeOrmModule.forRoot(config), UserModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
