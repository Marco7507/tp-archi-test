import { Product } from '../../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { UpdateProductService } from './update-product.service';

class ProductRepositoryFake {
  async save(product: Product): Promise<Product> {
    return product;
  }

  async findById(id: number): Promise<Product> {
    const product = new Product({
      name: 'product 1',
      price: 10,
      description: 'description',
      isActive: true,
      stock: 10,
    });
    product.id = id;
    return product;
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as unknown as ProductRepositoryInterface;

describe('update product service', () => {
  it('should update a product', async () => {
    const updateProductService = new UpdateProductService(
      productRepositoryFake,
    );

    await expect(
      updateProductService.execute({
        id: 1,
        name: 'product 1',
        price: 10,
        description: 'description',
        stock: 10,
      }),
    ).resolves.toEqual({
      id: 1,
      name: 'product 1',
      price: 10,
      description: 'description',
      isActive: true,
      stock: 10,
    });
  });

  it('should throw an error if the product name is empty', async () => {
    const updateProductService = new UpdateProductService(
      productRepositoryFake,
    );

    await expect(
      updateProductService.execute({
        id: 1,
        name: '',
        price: 10,
        description: 'description',
        stock: 10,
      }),
    ).rejects.toThrow();
  });
});
