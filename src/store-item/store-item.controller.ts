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
import {
  CreateStoreItemDto,
  StoreItemDto,
  StoreItemWithImagesDto,
  UpdateStoreItemDto,
} from './dto/_index';

@ApiTags('store-item')
@ApiBearerAuth()
@Controller('store-items')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreItemController {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Get()
  @ApiOperation({ summary: 'Get store items by category id' })
  @ApiResponse({ status: 200, type: StoreItemWithImagesDto, isArray: true })
  findStoreItemsByCategoryId(
    @Query('categoryId') categoryId: string,
  ): Promise<StoreItemWithImagesDto[]> {
    return this.storeItemService.findStoreItemsByCategoryId(categoryId);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get store item by slug' })
  @ApiResponse({ status: 200, type: StoreItemWithImagesDto })
  getStoreItemBySlug(
    @Param('slug') slug: string,
  ): Promise<StoreItemWithImagesDto> {
    return this.storeItemService.getStoreItemBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Create store item' })
  @ApiResponse({ status: 201, type: StoreItemDto })
  createStoreItem(
    @Body() createStoreItemDto: CreateStoreItemDto,
  ): Promise<StoreItemDto> {
    return this.storeItemService.createStoreItem(createStoreItemDto);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Update store item' })
  @ApiResponse({ status: 200, type: StoreItemDto })
  updateStoreItem(
    @Param('slug') slug: string,
    @Body() updateStoreItemDto: UpdateStoreItemDto,
  ): Promise<StoreItemDto> {
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
