import { Test, TestingModule } from '@nestjs/testing';

import { MenuCategoryService } from '../menu-category.service';
import { AllMenuController } from '../all-menu.controller';

describe('MenuCategoryController', () => {
  let controller: AllMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllMenuController],
      providers: [MenuCategoryService],
    })
      .overrideProvider(MenuCategoryService)
      .useValue({})
      .compile();

    controller = module.get<AllMenuController>(AllMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
