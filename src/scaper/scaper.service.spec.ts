import { Test, TestingModule } from '@nestjs/testing';
import { ScaperService } from './scaper.service';

describe('ScaperService', () => {
  let service: ScaperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScaperService],
    }).compile();

    service = module.get<ScaperService>(ScaperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
