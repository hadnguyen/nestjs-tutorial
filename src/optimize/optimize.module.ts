import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';
import { BullModule } from '@nestjs/bull';
import { ImageProcessor } from './image.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
  providers: [ImageProcessor],
  exports: [],
  controllers: [OptimizeController],
})
export class OptimizeModule {}
