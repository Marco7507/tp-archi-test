import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

export interface CreatePromotionDto {
  name: string;
  code: string;
  amount?: number;
}

@Entity()
export class Promotion {
  static DEFAULT_AMOUNT = 1500;

  @PrimaryGeneratedColumn()
  @Expose({ groups: ['group_promotions'] })
  id: number;

  @Column()
  @Expose({ groups: ['group_promotions'] })
  name: string;

  @Column()
  @Expose({ groups: ['group_promotions'] })
  code: string;

  @Column()
  @Expose({ groups: ['group_promotions'] })
  amount: number;

  constructor(createPromotionDto?: CreatePromotionDto) {
    if (!createPromotionDto) {
      return;
    }

    if (!createPromotionDto.name || !createPromotionDto.code) {
      throw new Error('Invalid promotion, name and code are required');
    }

    this.name = createPromotionDto.name;
    this.code = createPromotionDto.code;
    this.amount = createPromotionDto.amount || Promotion.DEFAULT_AMOUNT;
  }
}
