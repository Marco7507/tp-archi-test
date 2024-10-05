import PromotionRepositoryInterface from '../../domain/port/promotion.repository.interface';
import {
  CreatePromotionDto,
  Promotion,
} from '../../domain/entity/promotion.entity';

export class CreatePromotionService {
  constructor(
    private readonly promotionRepository: PromotionRepositoryInterface,
  ) {}

  async execute(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const promotion = new Promotion(createPromotionDto);
    return this.promotionRepository.save(promotion);
  }
}
