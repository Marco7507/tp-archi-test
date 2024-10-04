import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { UpdateProductDto } from '../../domain/entity/product.entity';

export class UpdateProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(updateProductDto: UpdateProductDto): Promise<any> {
    const product = await this.productRepository.findById(updateProductDto.id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.updateProduct(updateProductDto);

    await this.productRepository.save(product);

    return product;
  }
}
