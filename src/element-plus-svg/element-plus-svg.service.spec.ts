import { Test, TestingModule } from '@nestjs/testing';
import { ElementPlusSvgService } from './element-plus-svg.service';

describe('ElementPlusSvgService', () => {
  let service: ElementPlusSvgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElementPlusSvgService],
    }).compile();

    service = module.get<ElementPlusSvgService>(ElementPlusSvgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
