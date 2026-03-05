import { Test, TestingModule } from '@nestjs/testing';
import { SplitSchedulesService } from './split-schedules.service';

describe('SplitSchedulesService', () => {
  let service: SplitSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SplitSchedulesService],
    }).compile();

    service = module.get<SplitSchedulesService>(SplitSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
