import { Product } from '../../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { ListProductService } from './list-product.service';

class ProductRepositoryFake {
  async findByActive(isActive: boolean): Promise<Product[]> {
    return [
      new Product({
        name: 'product 1',
        price: 10,
        description: 'description',
        isActive: isActive,
        stock: 10,
      }),
      new Product({
        name: 'product 2',
        price: 10,
        description: 'description',
        isActive: isActive,
        stock: 10,
      }),
      new Product({
        name: 'product 3',
        price: 10,
        description: 'description',
        isActive: isActive,
        stock: 10,
      }),
    ];
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as unknown as ProductRepositoryInterface;

describe('list product service', () => {
  const listProductService = new ListProductService(productRepositoryFake);
  it('should list active products', async () => {
    await expect(listProductService.findByActive(true)).resolves.toEqual([
      {
        name: 'product 1',
        price: 10,
        description: 'description',
        isActive: true,
        stock: 10,
      },
      {
        name: 'product 2',
        price: 10,
        description: 'description',
        isActive: true,
        stock: 10,
      },
      {
        name: 'product 3',
        price: 10,
        description: 'description',
        isActive: true,
        stock: 10,
      },
    ]);
  });

  it('should list inactive products', async () => {
    await expect(listProductService.findByActive(false)).resolves.toEqual([
      {
        name: 'product 1',
        price: 10,
        description: 'description',
        isActive: false,
        stock: 10,
      },
      {
        name: 'product 2',
        price: 10,
        description: 'description',
        isActive: false,
        stock: 10,
      },
      {
        name: 'product 3',
        price: 10,
        description: 'description',
        isActive: false,
        stock: 10,
      },
    ]);
  });
});
