import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonSvgModule } from './common-svg/common-svg.module';
import { ElementPlusSvgModule } from './element-plus-svg/element-plus-svg.module';

@Module({
  imports: [CommonSvgModule, ElementPlusSvgModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
