import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../common/types/enums';
import { StatusResponse } from '../common/dto/status-response.dto';

import { OrderItemService } from './order-item.service';
import {
  CreateOrderItemDto,
  OrderItemDto,
  UpdateOrderItemDto,
} from './dto/_index';

@ApiTags('order-item')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get('item/:id')
  @ApiOperation({ summary: 'Get order item by id' })
  @ApiResponse({ status: 200, type: OrderItemDto })
  getOrderItemById(@Param('id') id: string): Promise<OrderItemDto> {
    return this.orderItemService.findOrderItemById(id);
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get order items by order id' })
  @ApiResponse({ status: 200, type: OrderItemDto, isArray: true })
  getOrderItemsByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<OrderItemDto[]> {
    return this.orderItemService.findOrderItemsByOrderId(orderId);
  }

  @Post()
  @ApiOperation({ summary: 'Create order item' })
  @ApiResponse({ status: 201, type: OrderItemDto })
  createOrderItem(
    @Body() orderItem: CreateOrderItemDto,
  ): Promise<OrderItemDto> {
    return this.orderItemService.createOrderItem(orderItem);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order item' })
  @ApiResponse({ status: 200, type: OrderItemDto })
  updateOrderItem(
    @Param('id') id: string,
    @Body() orderItem: UpdateOrderItemDto,
  ): Promise<OrderItemDto> {
    return this.orderItemService.updateOrderItem({ id, ...orderItem });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order item' })
  @ApiResponse({ status: 200, type: StatusResponse })
  deleteOrderItem(@Param('id') id: string): Promise<StatusResponse> {
    return this.orderItemService.deleteOrderItem(id);
  }
}
