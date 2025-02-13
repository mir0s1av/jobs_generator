import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UPLOAD_PATH } from './uploads.constants';
@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_PATH,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileName = `${file.filename}-${uniqueSuffix}.json`;
          cb(null, fileName);
        },
      }),
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'application/json') {
      return new BadRequestException('Only json files are allowed');
    }
    return { message: 'File uploaded successfuly', filename: file.filename };
  }
}
