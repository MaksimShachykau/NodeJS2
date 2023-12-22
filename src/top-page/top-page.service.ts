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

  async findTopPage(dto: FindTopPageDto) {
    return this.topPageModel.find(dto, { alias: 1, secondCategory: 1, title: 1 }).exec();
  }
}
