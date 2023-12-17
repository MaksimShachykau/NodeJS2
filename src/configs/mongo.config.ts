import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
export const getMongoConfig = async (configureService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configureService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configureService: ConfigService): string =>
  'mongodb://' +
  configureService.get('MONGO_LOGIN') +
  ':' +
  configureService.get('MONGO_PASSWORD') +
  '@' +
  configureService.get('MONGO_HOST') +
  ':' +
  configureService.get('MONGO_PORT') +
  '/' +
  configureService.get('MONGO_AUTHDATABASE');

const getMongoOptions = () => ({});
