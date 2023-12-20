import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async createUser(dto: AuthDto) {
    const salt = genSaltSync(10);

    const newUser = new this.userModel({
      email: dto.login,
      password: hashSync(dto.password, salt),
    });

    return newUser;
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
