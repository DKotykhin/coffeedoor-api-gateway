import { Test, TestingModule } from '@nestjs/testing';

import { StoreCategoryService } from '../store-category.service';
import { AllStoreController } from '../all-store.controller';

describe('StoreCategoryController', () => {
  let controller: AllStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllStoreController],
      providers: [StoreCategoryService],
    })
      .overrideProvider(StoreCategoryService)
      .useValue({})
      .compile();

    controller = module.get<AllStoreController>(AllStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
