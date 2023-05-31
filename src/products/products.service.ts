import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private filesService: FilesService,
  ) {}

  async getAllProducts() {
    const products = await this.productRepository.findAll();
    return products;
  }

  async getProductById(id: number) {
    const order = await this.productRepository.findOne({ where: { id } });
    return order;
  }

  async createProduct(createProductDto: CreateProductDto, image: any) {
    const fileName = await this.filesService.createFile(image);
    const product = await this.productRepository.create({
      ...createProductDto,
      image: fileName,
    });
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.update(
      { ...updateProductDto },
      { where: { id } },
    );
    return product;
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.destroy({ where: { id } });
    return product;
  }
}
