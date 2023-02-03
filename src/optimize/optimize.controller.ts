import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Readable } from 'stream';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('optimize')
export class OptimizeController {
  constructor(@InjectQueue('image') private readonly imageQueue: Queue) {}

  @Post('image')
  @UseInterceptors(AnyFilesInterceptor())
  async processImage(@UploadedFiles() files: Express.Multer.File[]) {
    const job = await this.imageQueue.add('optimize', {
      files,
    });

    return {
      jobId: job.id,
    };
  }

  @Get('image/:id')
  async getJobResult(@Res() response: Response, @Param('id') id: string) {
    const job = await this.imageQueue.getJob(id);

    if (!job) {
      return response.sendStatus(404);
    }

    const isCompleted = await job.isCompleted();

    if (!isCompleted) {
      return response.sendStatus(202);
    }

    const result = Buffer.from(job.returnvalue);

    const stream = Readable.from(result);

    stream.pipe(response);
  }
}
