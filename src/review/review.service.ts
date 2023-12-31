import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.tdo';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

export interface DeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {}

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(dto);
  }

  // : Promise<DocumentType<ReviewModel> | null>
  async delete(id: string) {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
  }

  async deleteByProductId(productId: string): Promise<DeleteResult> {
    return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
  }
}
