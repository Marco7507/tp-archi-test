import { CreateOrderService } from './create-order.service';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { Order } from '../../domain/entity/order.entity';
import { Product } from '../../../product/domain/entity/product.entity';

class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("an order can't be created if the order have more than 5 item", () => {
  it('should return an error', async () => {
    const createOrderService = new CreateOrderService(orderRepositoryFake);
    const product = new Product({
      name: 'item 1',
      price: 10,
      description: 'description',
    });
    await expect(
      createOrderService.execute({
        customerName: 'John Doe',
        items: [
          { productName: 'item 1', quantity: 1, product: product },
          { productName: 'item 1', quantity: 1, product: product },
          { productName: 'item 1', quantity: 1, product: product },
          { productName: 'item 1', quantity: 1, product: product },
          { productName: 'item 1', quantity: 1, product: product },
          { productName: 'item 1', quantity: 1, product: product },
        ],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
      }),
    ).rejects.toThrow();
  });
});
