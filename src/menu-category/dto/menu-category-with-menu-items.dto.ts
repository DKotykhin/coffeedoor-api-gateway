import { ApiProperty } from '@nestjs/swagger';

import { MenuCategoryDto } from './menu-category.dto';
import { MenuItemDto } from '../../menu-item/dto/_index';

export class MenuCategoryWithMenuItemsDto extends MenuCategoryDto {
  @ApiProperty({ type: MenuItemDto, isArray: true })
  menuItems: MenuItemDto[];
}
