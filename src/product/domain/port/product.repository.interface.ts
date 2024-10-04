import { Product } from '../entity/product.entity';

export interface ProductRepositoryInterface {
  save(product: Product): Promise<Product>;

  findById(id: number): Promise<Product | null>;

  findAll(): Promise<Product[]>;

  deleteProduct(id: number): Promise<void>;

  findByActive(isActive: boolean): Promise<Product[]>;
}
