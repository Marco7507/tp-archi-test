import { CreateOrderService } from './create-order.service';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { Order } from '../../domain/entity/order.entity';
import { Product } from '../../../product/domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../../product/domain/port/product.repository.interface';
import { MailSenderServiceInterface } from '../../domain/port/mail/mail-sender.service.interface';

class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }
}

class ProductRepositoryFake {
  async findById(productId: number): Promise<Product> {
    const product = new Product({
      name: 'Product 1',
      price: 100,
      description: 'Description',
      stock: 10,
    });
    product.id = productId;
    return product;
  }
}

class MailSenderServiceFake {
  async sendMail(): Promise<void> {
    return;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as unknown as OrderRepositoryInterface;

const productRepositoryFake =
  new ProductRepositoryFake() as unknown as ProductRepositoryInterface;

const mailSenderServiceFake =
  new MailSenderServiceFake() as unknown as MailSenderServiceInterface;

describe("an order can't be created if the order have more than 5 item", () => {
  it('should return an error', async () => {
    const createOrderService = new CreateOrderService(
      orderRepositoryFake,
      productRepositoryFake,
      mailSenderServiceFake,
    );

    await expect(
      createOrderService.execute({
        customerName: 'John Doe',
        items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 1 },
          { productId: 3, quantity: 1 },
          { productId: 4, quantity: 1 },
          { productId: 5, quantity: 1 },
          { productId: 6, quantity: 1 },
        ],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
      }),
    ).rejects.toThrow();
  });
});

describe('create an order', () => {
  it('should return an order', async () => {
    const createOrderService = new CreateOrderService(
      orderRepositoryFake,
      productRepositoryFake,
      mailSenderServiceFake,
    );

    const order = await createOrderService.execute({
      customerName: 'John Doe',
      items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 1 },
        { productId: 3, quantity: 1 },
        { productId: 4, quantity: 1 },
        { productId: 5, quantity: 1 },
      ],
      shippingAddress: 'Shipping Address',
      invoiceAddress: 'Invoice Address',
    });

    expect(order).toBeInstanceOf(Order);
  });
});
