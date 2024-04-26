import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { LanguageCode } from '../types/enums';
import {
  ChangeMenuCategoryPositionDto,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/_index';
import {
  MenuCategories,
  MenuCategory,
  MenuCategoryServiceClient,
  StatusResponse,
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
      language,
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
    return this.menuCategoryService.createMenuCategory(createMenuCategoryDto);
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

  remove(id: string): Observable<StatusResponse> {
    return this.menuCategoryService.deleteMenuCategory({ id });
  }
}
