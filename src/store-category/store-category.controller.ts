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

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleTypes } from '../common/types/enums';
import { IdDto, StatusResponse } from '../common/dto/_index';

import { StoreCategoryService } from './store-category.service';
import {
  CreateStoreCategoryDto,
  StoreCategoryDto,
  StoreCategoryWithItemsDto,
  UpdateStoreCategoryDto,
} from './dto/_index';

@ApiTags('store-categories')
@ApiBearerAuth()
@Controller('store-categories')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreCategoryController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all store categories with store items' })
  @ApiResponse({
    type: StoreCategoryWithItemsDto,
    isArray: true,
  })
  getAllStore(): Promise<StoreCategoryWithItemsDto[]> {
    return this.storeCategoryService.getAllStore();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store category by id with store items' })
  @ApiResponse({ status: 200, type: StoreCategoryWithItemsDto })
  getStoreCategoryById(
    @Param() idDto: IdDto,
  ): Promise<StoreCategoryWithItemsDto> {
    return this.storeCategoryService.getStoreCategoryById(idDto.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create store category' })
  @ApiResponse({ status: 201, type: StoreCategoryDto })
  createStoreCategory(
    @Body() createMenuCategoryDto: CreateStoreCategoryDto,
  ): Promise<StoreCategoryDto> {
    return this.storeCategoryService.createStoreCategory(createMenuCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update store category' })
  @ApiResponse({ status: 200, type: StoreCategoryDto })
  updateStoreCategory(
    @Param() idDto: IdDto,
    @Body() updateMenuCategoryDto: UpdateStoreCategoryDto,
  ): Promise<StoreCategoryDto> {
    return this.storeCategoryService.updateStoreCategory({
      id: idDto.id,
      ...updateMenuCategoryDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete store category' })
  @ApiResponse({ status: 200, type: StatusResponse })
  deleteStoreCategory(@Param() idDto: IdDto): Promise<StatusResponse> {
    return this.storeCategoryService.deleteStoreCategory(idDto.id);
  }
}
