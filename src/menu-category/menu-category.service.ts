import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { LanguageCode } from '../types/enums';
import {
  ChangeMenuCategoryPositionDto,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/_index';

@Injectable()
export class MenuCategoryService {
  constructor(
    @Inject('MENU_SERVICE') private readonly menuService: ClientProxy,
  ) {}

  async findByLanguage(language: LanguageCode) {
    return this.menuService.send('findMenuCategoryByLanguage', language);
  }

  async findAll() {
    return this.menuService.send('findAllMenuCategory', {});
  }

  async findById(id: string) {
    return this.menuService.send('findMenuCategoryById', id);
  }

  async create(createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuService.send('createMenuCategory', createMenuCategoryDto);
  }

  async update(id: string, updateMenuCategoryDto: UpdateMenuCategoryDto) {
    return this.menuService.send('updateMenuCategory', {
      id,
      ...updateMenuCategoryDto,
    });
  }

  async changePosition(
    changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ) {
    return this.menuService.send(
      'changeMenuCategoryPosition',
      changeMenuCategoryPositionDto,
    );
  }

  async remove(id: string) {
    return this.menuService.send('removeMenuCategory', id);
  }
}
