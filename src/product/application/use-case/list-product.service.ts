import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';

export class ListProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async findByActive(isActive: boolean): Promise<any> {
    return await this.productRepository.findByActive(isActive);
  }
}
