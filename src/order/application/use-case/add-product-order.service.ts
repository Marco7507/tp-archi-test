import { ProductRepositoryInterface } from '../../../product/domain/port/product.repository.interface';
import { MailSenderServiceInterface } from '../../domain/port/mail/mail-sender.service.interface';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { OrderItem } from '../../domain/entity/order-item.entity';

interface AddProductOrderDto {
  orderId: number;
  productId: number;
  quantity: number;
}

export class AddProductOrderService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface,
    private readonly mailSenderService: MailSenderServiceInterface,
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  async execute(addProductOrderDto: AddProductOrderDto) {
    const { orderId, productId, quantity } = addProductOrderDto;
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }
    const order = await this.orderRepository.findById(orderId.toString());
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    order.checkIfOrderCanBeModified();

    const orderItem = new OrderItem(
      { product, quantity },
      this.mailSenderService,
    );

    order.addProduct(orderItem);

    return this.orderRepository.save(order);
  }
}
