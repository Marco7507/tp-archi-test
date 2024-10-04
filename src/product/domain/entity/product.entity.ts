import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

export interface CreateProductDto {
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
  private id: number;

  @Column()
  @Expose({ groups: ['group_products'] })
  private name: string;

  @Column()
  @Expose({ groups: ['group_products'] })
  private price: number;

  @Column()
  @Expose({ groups: ['group_products'] })
  private stock: number;

  @Column()
  @Expose({ groups: ['group_products'] })
  private description: string;

  @Column()
  @Expose({ groups: ['group_products'] })
  private isActive: boolean;
}
