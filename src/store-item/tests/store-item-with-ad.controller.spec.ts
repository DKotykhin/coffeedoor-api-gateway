import { Test, TestingModule } from '@nestjs/testing';

import { StoreItemService } from '../store-item.service';
import { StoreItemWithAdController } from '../store-item-with-ad.controller';

describe('StoreItemController', () => {
  let controller: StoreItemWithAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreItemWithAdController],
      providers: [StoreItemService],
    })
      .overrideProvider(StoreItemService)
      .useValue({})
      .compile();

    controller = module.get<StoreItemWithAdController>(
      StoreItemWithAdController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
