import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleTypes } from '../common/types/enums';
import { StatusResponse } from '../common/dto/status-response.dto';

import { StoreItemImageService } from './store-item-image.service';
import { ImageDto } from './dto/image.dto';

@ApiTags('store-item-image')
@ApiBearerAuth()
@Controller('store-item-image')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreItemImageController {
  constructor(private readonly storeItemImageService: StoreItemImageService) {}

  @Post()
  @ApiOperation({ summary: 'Upload store image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        slug: { type: 'string' },
        position: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Max size 5MB',
        },
      },
    },
  })
  @ApiResponse({ status: 200, type: StatusResponse })
  @UseInterceptors(FileInterceptor('store-image'))
  uploadStoreImage(
    @Body('slug') slug: string,
    @Body('position') position: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/jpeg' || 'image/png' || 'image/webp',
          }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<StatusResponse> {
    return this.storeItemImageService.uploadStoreImage(slug, file, +position);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete store image' })
  @ApiResponse({ status: 200, type: StatusResponse })
  deleteStoreImage(@Body() imageDto: ImageDto): Promise<StatusResponse> {
    return this.storeItemImageService.deleteStoreImage(imageDto.image);
  }
}
