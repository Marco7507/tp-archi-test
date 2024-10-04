import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Product } from './domain/entity/product.entity';
import ProductTypeOrmRepository from './infrastructure/persistance/product-type-orm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductTypeOrmRepository],
})
export class ProductModule {}
