import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  @Expose({ groups: ['group_promotions'] })
  id: number;

  @Column()
  @Expose({ groups: ['group_promotions'] })
  name: number;

  @Column()
  @Expose({ groups: ['group_promotions'] })
  code: string;

  @Column()
  @Expose({ groups: ['group_promotions'] })
  amount: number;
}
