import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopPageModel } from './top-page.model';
import { TopPageModelDto } from './dto/create-top-page.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

  async createTopPage(dto: TopPageModelDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: TopPageModelDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByCategories({ firstCategory }: FindTopPageDto) {
    return await this.topPageModel
      .aggregate()
      .match({ firstCategory })
      .group({
        _id: '$secondCategory',
        pages: {
          $push: { alias: '$alias', title: '$title' },
        },
      });
  }

  async findTopPageByText(text: string) {
    return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
  }
}
