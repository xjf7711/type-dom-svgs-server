import { Controller, Get } from '@nestjs/common';
import { ElementPlusSvgService } from './element-plus-svg.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { performance } from 'perf_hooks';
@ApiTags('element-plus svg controller')
@Controller('element-plus-svg')
export class ElementPlusSvgController {
  constructor(private service: ElementPlusSvgService) {}

  @Get('generate-classes')
  @ApiOperation({ summary: '生成Svg类' })
  async generateSvgClasses() {
    console.log('common-svg generateSvgClasses . ');
    const start = performance.now();
    await this.service.generateSvgClasses();
    const end = performance.now();
    console.log('generateSvgClasses  long is ', end - start); // 7491.9866008758545
  }

  @Get('generate-indexes')
  @ApiOperation({ summary: '生成svg目录' })
  async generateSvgIndexes() {
    await this.service.generateSvgIndexes();
  }

  @Get('generate-list')
  @ApiOperation({ summary: '生成svg展示文件' })
  async generateSvgList() {
    await this.service.generateSvgList();
  }
}
