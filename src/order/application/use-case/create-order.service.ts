import {
  CreateOrderCommand,
  CreateOrderDto,
  Order,
} from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { ProductRepositoryInterface } from '../../../product/domain/port/product.repository.interface';
import { Product } from '../../../product/domain/entity/product.entity';

export class CreateOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    const products = [];

    for (const itemDto of createOrderDto.items) {
      const product = await this.productRepository.findById(itemDto.productId);
      if (!product) {
        throw new Error(`Product with id ${itemDto.productId} not found`);
      }
      products.push(product);
    }

    const createOrderCommand: CreateOrderCommand = {
      ...createOrderDto,
      items: products.map((product: Product, index) => ({
        product,
        quantity: createOrderDto.items[index].quantity,
      })),
    };

    const order = new Order(createOrderCommand);

    return this.orderRepository.save(order);
  }
}
