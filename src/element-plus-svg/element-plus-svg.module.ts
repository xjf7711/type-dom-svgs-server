import { Module } from '@nestjs/common';
import { ElementPlusSvgController } from './element-plus-svg.controller';
import { ElementPlusSvgService } from './element-plus-svg.service';

@Module({
  controllers: [ElementPlusSvgController],
  providers: [ElementPlusSvgService]
})
export class ElementPlusSvgModule {}
