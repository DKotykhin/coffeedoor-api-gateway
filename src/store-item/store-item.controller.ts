import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
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
import { StatusResponse } from '../common/dto/status-response.dto';

import { StoreItemService } from './store-item.service';
import { CreateStoreItemDto } from './dto/create-store-item.dto';
import { UpdateStoreItemDto } from './dto/update-store-item.dto';
import { StoreItem, StoreItemWithImages } from './store-item.pb';

@ApiTags('store-item')
@ApiBearerAuth()
@Controller('store-items')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreItemController {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Get()
  @ApiOperation({ summary: 'Get store items by category id' })
  findStoreItemsByCategoryId(
    @Query('categoryId') categoryId: string,
  ): Promise<StoreItemWithImages[]> {
    return this.storeItemService.findStoreItemsByCategoryId(categoryId);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get store item by slug' })
  getStoreItemBySlug(
    @Param('slug') slug: string,
  ): Promise<StoreItemWithImages> {
    return this.storeItemService.getStoreItemBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Create store item' })
  createStoreItem(
    @Body() createStoreItemDto: CreateStoreItemDto,
  ): Promise<StoreItem> {
    return this.storeItemService.createStoreItem(createStoreItemDto);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Update store item' })
  updateStoreItem(
    @Param('slug') slug: string,
    @Body() updateStoreItemDto: UpdateStoreItemDto,
  ): Promise<StoreItem> {
    return this.storeItemService.updateStoreItem({
      slug,
      ...updateStoreItemDto,
    });
  }

  @Delete(':slug')
  @ApiOperation({ summary: 'Delete store item' })
  @ApiResponse({ status: 200, type: StatusResponse })
  deleteStoreItem(@Param('slug') slug: string): Promise<StatusResponse> {
    return this.storeItemService.deleteStoreItem(slug);
  }
}
