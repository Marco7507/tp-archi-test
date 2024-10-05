import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './domain/entity/promotion.entity';
import { CreatePromotionService } from './application/use-case/create-promotion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion])],
  providers: [CreatePromotionService],
})
export class PromotionModule {}
