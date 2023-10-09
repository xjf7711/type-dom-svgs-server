import { Test, TestingModule } from '@nestjs/testing';
import { ElementPlusSvgController } from './element-plus-svg.controller';

describe('ElementPlusSvgController', () => {
  let controller: ElementPlusSvgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElementPlusSvgController],
    }).compile();

    controller = module.get<ElementPlusSvgController>(ElementPlusSvgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
