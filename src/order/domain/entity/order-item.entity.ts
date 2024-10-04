import { Order } from './order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../product/domain/entity/product.entity';

export interface ItemDetailCommand {
  productName: string;
  quantity: number;
  product: Product;
}

@Entity('order-item')
export class OrderItem {
  static MAX_QUANTITY = 5;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  constructor(itemCommand: ItemDetailCommand) {
    if (!itemCommand) {
      return;
    }
    if (itemCommand.quantity > OrderItem.MAX_QUANTITY) {
      throw new Error(
        'Quantity of items cannot exceed ' + OrderItem.MAX_QUANTITY,
      );
    }

    this.productName = itemCommand.productName;
    this.quantity = itemCommand.quantity;
    this.product = itemCommand.product;
    this.price = this.calculatePrice();
  }

  calculatePrice(): number {
    return this.quantity * this.product.price;
  }
}
