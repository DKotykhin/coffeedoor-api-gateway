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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleTypes } from '../types/enums';

import { StoreItemService } from './store-item.service';
import { CreateStoreItemDto } from './dto/create-store-item.dto';
import { UpdateStoreItemDto } from './dto/update-store-item.dto';
import { StatusResponse, StoreItem, StoreItemWithAd } from './store-item.pb';

@ApiTags('store-item')
@Controller('store-item-with-recommendations')
export class StoreItemWithRecommendationsController {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Get(':slug')
  findBySlugWithRecommendations(
    @Param('slug') slug: string,
  ): Promise<StoreItemWithAd> {
    return this.storeItemService.findBySlugWithAd(slug);
  }
}

@ApiTags('store-item')
@ApiBearerAuth()
@Controller('store-items')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreItemController {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Get()
  findAllByCategoryId(
    @Query('categoryId') categoryId: string,
  ): Promise<StoreItem[]> {
    return this.storeItemService.findByCategoryId(categoryId);
  }

  @Get(':slug')
  findById(@Param('slug') slug: string): Promise<StoreItem> {
    return this.storeItemService.findBySlug(slug);
  }

  @Post()
  create(@Body() createStoreItemDto: CreateStoreItemDto): Promise<StoreItem> {
    return this.storeItemService.create(createStoreItemDto);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateStoreItemDto: UpdateStoreItemDto,
  ): Promise<StoreItem> {
    return this.storeItemService.update({ slug, ...updateStoreItemDto });
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string): Promise<StatusResponse> {
    return this.storeItemService.delete(slug);
  }
}
