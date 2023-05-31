import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Auth } from 'src/iam/decorators/authentication.decorator';
import { AuthType } from 'src/iam/enums/auth-type.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: HttpStatus.OK, type: [Product] })
  @Auth(AuthType.None)
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @Auth(AuthType.None)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(+id);
  }

  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @Roles('admin')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: any,
  ) {
    return this.productsService.createProduct(createProductDto, image);
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @Roles('admin')
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(+id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('admin')
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }
}
