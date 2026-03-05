import { Test, TestingModule } from '@nestjs/testing';
import { SplitSchedulesController } from './split-schedules.controller';

describe('SplitSchedulesController', () => {
  let controller: SplitSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SplitSchedulesController],
    }).compile();

    controller = module.get<SplitSchedulesController>(SplitSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
