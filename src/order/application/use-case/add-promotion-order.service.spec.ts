import { Order } from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import PromotionRepositoryInterface from '../../../promotion/domain/port/promotion.repository.interface';
import { AddPromotionOrderService } from './add-promotion-order.service';
import { MailSenderServiceInterface } from '../../domain/port/mail/mail-sender.service.interface';
import { Product } from '../../../product/domain/entity/product.entity';

class MailSenderServiceFake implements MailSenderServiceInterface {
  async sendMail(): Promise<void> {
    return;
  }
}

class OrderRepositoryFake {
  fakeOrder: Order;

  constructor() {
    const product = new Product({
      name: 'Product 1',
      price: 100,
      description: 'Description',
      stock: 10,
    });

    this.fakeOrder = new Order(
      {
        customerName: 'John Doe',
        items: [
          { product, quantity: 1 },
          { product, quantity: 1 },
        ],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
        promotion: null,
      },
      new MailSenderServiceFake(),
    );
  }

  async save(order: Order): Promise<Order> {
    return order;
  }

  async findById(orderId: string): Promise<Order> {
    return this.fakeOrder;
  }
}

class PromotionRepositoryFake {
  async findByCode(promotionCode: string): Promise<any> {
    if (promotionCode === '#PROMO') {
      return {
        name: 'promotion 1',
        code: '#PROMO',
        amount: 10,
      };
    }
    return null;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as unknown as OrderRepositoryInterface;

const promotionRepositoryFake =
  new PromotionRepositoryFake() as unknown as PromotionRepositoryInterface;

describe('add promotion order service', () => {
  it('should add a promotion to an order', async () => {
    const addPromotionOrderService = new AddPromotionOrderService(
      orderRepositoryFake,
      promotionRepositoryFake,
    );

    const order = await orderRepositoryFake.findById('1');

    await addPromotionOrderService.execute(order.id, '#PROMO');

    expect(order.promotion).toEqual({
      name: 'promotion 1',
      code: '#PROMO',
      amount: 10,
    });

    expect(order.price).toEqual(190);
  });
});
