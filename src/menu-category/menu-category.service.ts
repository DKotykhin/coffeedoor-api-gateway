import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { LanguageCode, StatusResponseDto } from '../types/_index';
import {
  ChangeMenuCategoryPositionDto,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/_index';
import {
  CreateMenuCategoryRequest,
  MenuCategories,
  MenuCategory,
  MenuCategoryServiceClient,
} from './menu-category.pb';

@Injectable()
export class MenuCategoryService implements OnModuleInit {
  private menuCategoryService: MenuCategoryServiceClient;
  constructor(
    @Inject('MENU_CATEGORY_SERVICE')
    private readonly menuServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.menuCategoryService = this.menuServiceClient.getService(
      'MenuCategoryService',
    );
  }

  findByLanguage(language: LanguageCode): Observable<MenuCategories> {
    return this.menuCategoryService.getMenuCategoriesByLanguage({
      language: language === LanguageCode.UA ? 0 : 1,
    });
  }

  findAll() {
    return this.menuCategoryService.getAllMenuCategories({});
  }

  findById(id: string): Observable<MenuCategory> {
    return this.menuCategoryService.getMenuCategoryById({ id });
  }

  create(
    createMenuCategoryDto: CreateMenuCategoryDto,
  ): Observable<MenuCategory> {
    return this.menuCategoryService.createMenuCategory(
      createMenuCategoryDto as unknown as CreateMenuCategoryRequest,
    );
  }

  update(
    id: string,
    updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Observable<MenuCategory> {
    return this.menuCategoryService.updateMenuCategory({
      id,
      ...updateMenuCategoryDto,
    });
  }

  changePosition(
    changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Observable<MenuCategory> {
    return this.menuCategoryService.changeMenuCategoryPosition(
      changeMenuCategoryPositionDto,
    );
  }

  remove(id: string): Observable<StatusResponseDto> {
    return this.menuCategoryService.deleteMenuCategory({ id });
  }
}
