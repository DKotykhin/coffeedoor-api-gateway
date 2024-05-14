import { Test, TestingModule } from '@nestjs/testing';

import { MenuCategoryService } from '../menu-category.service';
import { AllMenuController } from '../all-menu.controller';

describe('MenuCategoryController', () => {
  let controller: AllMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllMenuController],
      providers: [
        MenuCategoryService,
        {
          provide: 'MENU_CATEGORY_SERVICE',
          useValue: {},
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AllMenuController>(AllMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
