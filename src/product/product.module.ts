import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Product } from './domain/entity/product.entity';
import ProductTypeOrmRepository from './infrastructure/persistance/product-type-orm.repository';
import { CreateProductService } from './application/use-case/create-product.service';
import { DeleteProductService } from './application/use-case/delete-product.service';
import { ListProductService } from './application/use-case/list-product.service';
import { UpdateProductService } from './application/use-case/update-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductTypeOrmRepository,
    CreateProductService,
    DeleteProductService,
    ListProductService,
    UpdateProductService,
  ],
})
export class ProductModule {}
