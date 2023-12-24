import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async saveFiles(files: Express.Multer.File[]): Promise<FileElementResponse[]> {
    const dateFonder = format(new Date(), 'yyyy-mm-dd');
    const uploadFolder = `${path}/upload/${dateFonder}`;

    await ensureDir(uploadFolder);

    const res: FileElementResponse[] = [];
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      res.push({ url: `${dateFonder}/${file.originalname}`, name: file.originalname });
    }

    return res;
  }
}
