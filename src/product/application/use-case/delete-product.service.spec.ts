import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { OrderRepositoryInterface } from '../../../order/domain/port/persistance/order.repository.interface';
import { DeleteProductService } from './delete-product.service';
import { Product } from '../../domain/entity/product.entity';

class ProductRepositoryFake {
  async deleteProduct(id: number) {
    return true;
  }

  async findById(id: number) {
    return new Product({
      name: 'Product',
      price: 100,
      description: 'Description',
      stock: 10,
    });
  }
}

class OrderRepositoryFake {
  async findByProductId(id: string) {
    if (id === '1') {
      return [{ id: 1 }];
    }
    return [];
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as unknown as ProductRepositoryInterface;

const orderRepositoryFake =
  new OrderRepositoryFake() as unknown as OrderRepositoryInterface;

describe('delete product service', () => {
  const deleteProductService = new DeleteProductService(
    productRepositoryFake,
    orderRepositoryFake,
  );
  it('should delete a product', async () => {
    const id = 2;

    await expect(deleteProductService.execute(id)).resolves.toBeTruthy();
  });

  it('should throw an error if the product is used in orders', async () => {
    const id = 1;

    await expect(deleteProductService.execute(id)).rejects.toThrowError(
      'Product is used in orders',
    );
  });
});
