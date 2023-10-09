import { Module } from '@nestjs/common';
import { CommonSvgController } from './common-svg.controller';
import { CommonSvgService } from './common-svg.service';

@Module({
  controllers: [CommonSvgController],
  providers: [CommonSvgService]
})
export class CommonSvgModule {}
