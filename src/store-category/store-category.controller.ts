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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RoleTypes } from '../common/types/enums';
import { StatusResponse } from '../common/dto/status-response.dto';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

import { StoreCategoryService } from './store-category.service';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import { StoreCategory, StoreCategoryWithItems } from './store-category.pb';

@ApiTags('store-categories')
@ApiBearerAuth()
@Controller('store-categories')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreCategoryController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all store categories with store items' })
  getAllStore(): Promise<StoreCategoryWithItems[]> {
    return this.storeCategoryService.getAllStore();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store category by id with store items' })
  getStoreCategoryById(
    @Param('id') id: string,
  ): Promise<StoreCategoryWithItems> {
    return this.storeCategoryService.getStoreCategoryById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create store category' })
  createStoreCategory(
    @Body() createMenuCategoryDto: CreateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.createStoreCategory(createMenuCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update store category' })
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
  @ApiOperation({ summary: 'Delete store category' })
  @ApiResponse({ status: 200, type: StatusResponse })
  deleteStoreCategory(@Param('id') id: string): Promise<StatusResponse> {
    return this.storeCategoryService.deleteStoreCategory(id);
  }
}
