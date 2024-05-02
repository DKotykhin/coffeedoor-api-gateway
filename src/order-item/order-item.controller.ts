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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../types/enums';
import { OrderItemService } from './order-item.service';
import {
  CreateOrderItemRequest,
  OrderItem,
  OrderItemList,
  StatusResponse,
} from './order-item.pb';

@ApiTags('order-item')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get('item/:id')
  getOrderItemById(@Param('id') id: string): Promise<OrderItem> {
    return this.orderItemService.findOrderItemById(id);
  }

  @Get('order/:orderId')
  getOrderItemsByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<OrderItemList> {
    return this.orderItemService.findOrderItemsByOrderId(orderId);
  }

  @Post()
  createOrderItem(
    @Body() orderItem: CreateOrderItemRequest,
  ): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(orderItem);
  }

  @Patch(':id')
  updateOrderItem(
    @Param('id') id: string,
    @Body() orderItem: CreateOrderItemRequest,
  ): Promise<OrderItem> {
    return this.orderItemService.updateOrderItem({ id, ...orderItem });
  }

  @Delete(':id')
  deleteOrderItem(@Param('id') id: string): Promise<StatusResponse> {
    return this.orderItemService.deleteOrderItem(id);
  }
}
