import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LanguageCode, RoleTypes } from '../types/enums';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

import { StoreCategoryService } from './store-category.service';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import {
  StatusResponse,
  StoreCategory,
  StoreCategoryList,
} from './store-category.pb';

@Controller('all-store')
@UseInterceptors(ClassSerializerInterceptor)
export class StoreController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Get()
  findByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<StoreCategoryList> {
    return this.storeCategoryService.findByLanguage(language);
  }
}

@Controller('store-categories')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreCategoryController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Get()
  findAll(): Promise<StoreCategoryList> {
    return this.storeCategoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<StoreCategory> {
    return this.storeCategoryService.findById(id);
  }

  @Post()
  create(
    @Body() createMenuCategoryDto: CreateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.create(createMenuCategoryDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.update({ id, ...updateMenuCategoryDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<StatusResponse> {
    return this.storeCategoryService.delete(id);
  }
}
