import { Order } from './order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../product/domain/entity/product.entity';

export interface ItemDetailDto {
  productId: number;
  quantity: number;
}

export interface ItemDetailCommand {
  product: Product;
  quantity: number;
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

    if (!itemCommand.product.isActive) {
      throw new Error('Product is not active');
    }

    this.quantity = itemCommand.quantity;
    this.price = this.calculatePrice(itemCommand);
    this.product = itemCommand.product;
    this.productName = itemCommand.product.name;
    this.product.removeQuantity(itemCommand.quantity);
  }

  private calculatePrice(itemCommand: ItemDetailCommand): number {
    return itemCommand.quantity * itemCommand.product.price;
  }
}
