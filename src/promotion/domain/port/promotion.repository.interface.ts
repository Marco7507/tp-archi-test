import { Promotion } from '../entity/promotion.entity';

export default interface PromotionRepositoryInterface {
  save(promotion: Promotion): Promise<Promotion>;

  deletePromotion(id: number): Promise<void>;

  findById(id: number): Promise<Promotion>;

  findAll(): Promise<Promotion[]>;

  findByCode(promotionCode: string): Promise<any>;
}
