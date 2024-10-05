import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import PromotionRepositoryInterface from '../../../promotion/domain/port/promotion.repository.interface';

export class AddPromotionOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly promotionRepository: PromotionRepositoryInterface,
  ) {}

  async execute(orderId: string, promotionCode: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    const promotion = await this.promotionRepository.findByCode(promotionCode);
    if (!promotion) {
      throw new Error(`Promotion with code ${promotionCode} not found`);
    }

    order.applyPromotion(promotion);
    await this.orderRepository.save(order);
  }
}
