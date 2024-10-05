import { Promotion } from '../../domain/entity/promotion.entity';
import { CreatePromotionService } from './create-promotion.service';
import PromotionRepositoryInterface from '../../domain/port/promotion.repository.interface';

class PromotionRepositoryFake {
  async save(promotion: Promotion): Promise<Promotion> {
    return promotion;
  }
}

const promotionRepositoryFake =
  new PromotionRepositoryFake() as unknown as PromotionRepositoryInterface;

describe('create promotion service', () => {
  it('should create a promotion', async () => {
    const createPromotionService = new CreatePromotionService(
      promotionRepositoryFake,
    );

    await expect(
      createPromotionService.execute({
        name: 'promotion 1',
        code: '#PROMO',
        amount: 10,
      }),
    ).resolves.toEqual({
      name: 'promotion 1',
      code: '#PROMO',
      amount: 10,
    });
  });

  it('should throw an error if the promotion name is empty', async () => {
    const createPromotionService = new CreatePromotionService(
      promotionRepositoryFake,
    );

    await expect(
      createPromotionService.execute({
        name: '',
        code: '#PROMO',
        amount: 10,
      }),
    ).rejects.toThrow();
  });

  it('should throw an error if the promotion code is empty', async () => {
    const createPromotionService = new CreatePromotionService(
      promotionRepositoryFake,
    );

    await expect(
      createPromotionService.execute({
        name: 'promotion 1',
        code: '',
        amount: 10,
      }),
    ).rejects.toThrow();
  });

  it('should create a promotion with default amount', async () => {
    const createPromotionService = new CreatePromotionService(
      promotionRepositoryFake,
    );

    await expect(
      createPromotionService.execute({
        name: 'promotion 1',
        code: '#PROMO',
      }),
    ).resolves.toEqual({
      name: 'promotion 1',
      code: '#PROMO',
      amount: Promotion.DEFAULT_AMOUNT,
    });
  });
});
