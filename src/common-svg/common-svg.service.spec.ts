import { Test, TestingModule } from '@nestjs/testing';
import { CommonSvgService } from './common-svg.service';

describe('CommonSvgService', () => {
  let service: CommonSvgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonSvgService],
    }).compile();

    service = module.get<CommonSvgService>(CommonSvgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
