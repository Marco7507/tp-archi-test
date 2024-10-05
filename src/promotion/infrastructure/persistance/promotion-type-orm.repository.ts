import { DataSource, Repository } from 'typeorm';
import { Promotion } from '../../domain/entity/promotion.entity';
import PromotionRepositoryInterface from '../../domain/port/promotion.repository.interface';
import { InjectDataSource } from '@nestjs/typeorm';

export default class PromotionTypeOrmRepository
  extends Repository<Promotion>
  implements PromotionRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Promotion, datasource.createEntityManager());
  }

  async deletePromotion(id: number): Promise<void> {
    const queryBuilder = this.createQueryBuilder('promotion');

    queryBuilder.where('promotion.id = :id', { id });

    await queryBuilder.delete().execute();
  }

  findAll(): Promise<Promotion[]> {
    const queryBuilder = this.createQueryBuilder('promotion');

    return queryBuilder.getMany();
  }

  findById(id: number): Promise<Promotion> {
    const queryBuilder = this.createQueryBuilder('promotion');

    queryBuilder.where('promotion.id = :id', { id });

    return queryBuilder.getOne();
  }
}
