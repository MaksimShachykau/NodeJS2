import { Body, Controller, Delete, Get, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.tdo';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException('Not found review by ID', HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  // @Delete('byProduct/:productId')
  // async deleteByProductId(@Param() productId: string) {
  //   await this.reviewService.deleteByProductId(productId);
  // }
}
