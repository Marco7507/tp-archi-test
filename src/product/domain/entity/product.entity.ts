import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { MailSenderServiceInterface } from '../../../order/domain/port/mail/mail-sender.service.interface';

export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
  stock?: number;
  isActive?: boolean;
}

export interface UpdateProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
  stock?: number;
  isActive?: boolean;
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Expose({ groups: ['group_products'] })
  id: number;

  @Column()
  @Expose({ groups: ['group_products'] })
  name: string;

  @Column()
  @Expose({ groups: ['group_products'] })
  price: number;

  @Column()
  @Expose({ groups: ['group_products'] })
  private stock: number;

  @Column()
  @Expose({ groups: ['group_products'] })
  private description: string;

  @Column()
  @Expose({ groups: ['group_products'] })
  isActive: boolean;

  constructor(createProductDto?: CreateProductDto) {
    if (!createProductDto) {
      return;
    }

    if (
      !createProductDto.name ||
      !createProductDto.price ||
      !createProductDto.description
    ) {
      throw new Error('Invalid product');
    }

    this.name = createProductDto.name;
    this.price = createProductDto.price;
    this.description = createProductDto.description;
    this.stock = createProductDto.stock || 0;
    if (createProductDto.isActive !== undefined) {
      this.isActive = createProductDto.isActive;
    } else {
      this.isActive = true;
    }
  }

  updateProduct(updateProductDto: UpdateProductDto) {
    if (
      !updateProductDto.name ||
      !updateProductDto.price ||
      !updateProductDto.description
    ) {
      throw new Error('Invalid product');
    }

    this.name = updateProductDto.name;
    this.price = updateProductDto.price;
    this.description = updateProductDto.description;
    if (updateProductDto.stock) {
      this.stock = updateProductDto.stock;
    }
    if (updateProductDto.isActive !== undefined) {
      this.isActive = updateProductDto.isActive;
    }
  }

  removeQuantity(
    quantity: number,
    mailSenderService: MailSenderServiceInterface,
  ) {
    if (quantity > this.stock) {
      throw new Error('Not enough stock');
    }

    this.stock -= quantity;

    if (this.stock !== 0) {
      return;
    }

    this.isActive = false;
    mailSenderService.sendMail('admin@test.fr', 'Stock empty', 'Stock empty');
  }
}
