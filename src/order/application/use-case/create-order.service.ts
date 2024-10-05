import {
  CreateOrderCommand,
  CreateOrderDto,
  Order,
} from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { ProductRepositoryInterface } from '../../../product/domain/port/product.repository.interface';
import { Product } from '../../../product/domain/entity/product.entity';
import { MailSenderServiceInterface } from '../../domain/port/mail/mail-sender.service.interface';
import PromotionRepositoryInterface from '../../../promotion/domain/port/promotion.repository.interface';

export class CreateOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly productRepository: ProductRepositoryInterface,
    private readonly mailSenderService: MailSenderServiceInterface,
    private readonly promotionRepository: PromotionRepositoryInterface,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    const productsPromise = this.getProducts(createOrderDto);
    const promotionPromise = this.getPromotion(createOrderDto.promotionCode);

    const [products, promotion] = await Promise.all([
      productsPromise,
      promotionPromise,
    ]);

    const createOrderCommand: CreateOrderCommand = {
      ...createOrderDto,
      items: products.map((product: Product, index) => ({
        product,
        quantity: createOrderDto.items[index].quantity,
      })),
      promotion,
    };

    const order = new Order(createOrderCommand, this.mailSenderService);

    return this.orderRepository.save(order);
  }

  private async getProducts(
    createOrderDto: CreateOrderDto,
  ): Promise<Product[]> {
    const products = [];

    for (const itemDto of createOrderDto.items) {
      const product = await this.productRepository.findById(itemDto.productId);
      if (!product) {
        throw new Error(`Product with id ${itemDto.productId} not found`);
      }
      products.push(product);
    }

    return products;
  }

  private async getPromotion(promotionCode: string) {
    if (!promotionCode) {
      return null;
    }

    const promotion = this.promotionRepository.findByCode(promotionCode);

    if (!promotion) {
      throw new Error(`Promotion with code ${promotionCode} not found`);
    }

    return promotion;
  }
}
