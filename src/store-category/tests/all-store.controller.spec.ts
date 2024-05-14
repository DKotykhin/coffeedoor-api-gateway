import { Test, TestingModule } from '@nestjs/testing';

import { StoreCategoryService } from '../store-category.service';
import { AllStoreController } from '../all-store.controller';
import { FileUploadService } from '../../file-upload/file-upload.service';

describe('StoreCategoryController', () => {
  let controller: AllStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllStoreController],
      providers: [
        StoreCategoryService,
        {
          provide: 'STORE_CATEGORY_SERVICE',
          useValue: {},
        },
        {
          provide: FileUploadService,
          useValue: {},
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AllStoreController>(AllStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
