import { Product } from 'aws-sdk/clients/ssm';
import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { CreateProductService } from './create-product.service';

class ProductRepositoryFake {
  async save(product: Product): Promise<Product> {
    return product;
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as unknown as ProductRepositoryInterface;

describe('create product service', () => {
  it('should create a product', async () => {
    const createProductService = new CreateProductService(
      productRepositoryFake,
    );

    await expect(
      createProductService.execute({
        name: 'product 1',
        price: 10,
        description: 'description',
        stock: 10,
      }),
    ).resolves.toEqual({
      name: 'product 1',
      price: 10,
      description: 'description',
      isActive: true,
      stock: 10,
    });
  });

  it('should throw an error if the product name is empty', async () => {
    const createProductService = new CreateProductService(
      productRepositoryFake,
    );

    await expect(
      createProductService.execute({
        name: '',
        price: 10,
        description: 'description',
        stock: 10,
      }),
    ).rejects.toThrow();
  });
});
