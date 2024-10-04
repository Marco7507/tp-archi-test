import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from '../../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { DataSource, Repository } from 'typeorm';

export default class ProductTypeOrmRepository
  extends Repository<Product>
  implements ProductRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Product, datasource.createEntityManager());
  }

  async findById(id: number): Promise<Product | null> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.id = :id', { id });

    return queryBuilder.getOne();
  }

  async findAll(): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('product');

    return queryBuilder.getMany();
  }

  async deleteProduct(id: number): Promise<void> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.id = :id', { id });

    await queryBuilder.delete().execute();
  }

  findByActive(isActive: boolean): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.isActive = :isActive', { isActive });

    return queryBuilder.getMany();
  }
}
