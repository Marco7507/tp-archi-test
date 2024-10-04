import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { CreateProductDto, Product } from '../../domain/entity/product.entity';

export class CreateProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product(createProductDto);

    return await this.productRepository.save(product);
  }
}
