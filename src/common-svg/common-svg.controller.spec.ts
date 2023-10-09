import { Test, TestingModule } from '@nestjs/testing';
import { CommonSvgController } from './common-svg.controller';

describe('CommonSvgController', () => {
  let controller: CommonSvgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonSvgController],
    }).compile();

    controller = module.get<CommonSvgController>(CommonSvgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
