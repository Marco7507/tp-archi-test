import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { OrderRepositoryInterface } from '../../../order/domain/port/persistance/order.repository.interface';
import { BadRequestException } from '@nestjs/common';
import { Product } from '../../domain/entity/product.entity';

export class DeleteProductService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface,
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const orders = await this.orderRepository.findByProductId(id.toString());

    if (orders.length > 0) {
      throw new BadRequestException('Product is used in orders');
    }

    await this.productRepository.deleteProduct(id);

    return product;
  }
}
