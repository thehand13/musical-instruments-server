import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';
import { FilesService } from 'src/files/files.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private filesService: FilesService,
    private ordersService: OrdersService,
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
    const price = +createProductDto.price;
    if (isNaN(price)) {
      throw new HttpException('Price is not a number', HttpStatus.BAD_REQUEST);
    }
    const newProduct = {
      title: createProductDto.title,
      description: createProductDto.description,
      price: +createProductDto.price,
      image: fileName,
    };
    const product = await this.productRepository.create(newProduct);
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const price = +updateProductDto.price;
    if (isNaN(price)) {
      throw new HttpException('Price is not a number', HttpStatus.BAD_REQUEST);
    }
    const updatedProduct = {
      title: updateProductDto.title,
      description: updateProductDto.description,
      price: +updateProductDto.price,
    };
    const product = await this.productRepository.update(updatedProduct, {
      where: { id },
    });
    return product;
  }

  async deleteProduct(id: number) {
    await this.ordersService.deleteProductFromAllOrders(id);
    const product = await this.productRepository.destroy({ where: { id } });
    return product;
  }
}
