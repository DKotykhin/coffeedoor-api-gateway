import { Test, TestingModule } from '@nestjs/testing';

import {
  StoreCategoryController,
  StoreController,
} from '../store-category.controller';
import { StoreCategoryService } from '../store-category.service';

describe('StoreCategoryController', () => {
  let controller: StoreController;
  let categoryController: StoreCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController, StoreCategoryController],
      providers: [StoreCategoryService],
    })
      .overrideProvider(StoreCategoryService)
      .useValue({})
      .compile();

    categoryController = module.get<StoreCategoryController>(
      StoreCategoryController,
    );
    controller = module.get<StoreController>(StoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });
});
