import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

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
  private name: string;

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
  private isActive: boolean;

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
    this.isActive = createProductDto.isActive || true;
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
}
