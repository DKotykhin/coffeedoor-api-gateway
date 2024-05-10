import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleTypes } from '../types/enums';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

import { StoreCategoryService } from './store-category.service';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import {
  StatusResponse,
  StoreCategory,
  StoreCategoryWithItems,
} from './store-category.pb';

@ApiTags('store-categories')
@ApiBearerAuth()
@Controller('store-categories')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreCategoryController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Get()
  getAllStore(): Promise<StoreCategoryWithItems[]> {
    return this.storeCategoryService.getAllStore();
  }

  @Get(':id')
  getStoreCategoryById(
    @Param('id') id: string,
  ): Promise<StoreCategoryWithItems> {
    return this.storeCategoryService.getStoreCategoryById(id);
  }

  @Post()
  createStoreCategory(
    @Body() createMenuCategoryDto: CreateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.createStoreCategory(createMenuCategoryDto);
  }

  @Patch(':id')
  updateStoreCategory(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.updateStoreCategory({
      id,
      ...updateMenuCategoryDto,
    });
  }

  @Delete(':id')
  deleteStoreCategory(@Param('id') id: string): Promise<StatusResponse> {
    return this.storeCategoryService.deleteStoreCategory(id);
  }
}
