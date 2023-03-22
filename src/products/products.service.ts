import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async getAllProducts() {
    const products = await this.productRepository.findAll();
    return products;
  }

  async getProductById(id: string) {
    const order = await this.productRepository.findOne({ where: { id } });
    return order;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.update(
      { ...updateProductDto },
      { where: { id } },
    );
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.destroy({ where: { id } });
    return product;
  }
}
