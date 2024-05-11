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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '../auth/auth.pb';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { OrderService } from './order.service';
import { RoleTypes } from '../types/enums';
import {
  CreateOrderRequest,
  Order,
  OrderWithItems,
  StatusResponse,
  UpdateOrderRequest,
} from './order.pb';

@ApiTags('order')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('user')
  @ApiOperation({ summary: 'Get orders by user id' })
  getOrdersByUserId(@GetUser() user: User): Promise<OrderWithItems[]> {
    return this.orderService.findOrdersByUserId(user.id);
  }

  @Get('order/:id')
  @ApiOperation({ summary: 'Get order by id' })
  @HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
  getOrderById(@Param('id') id: string): Promise<OrderWithItems> {
    return this.orderService.findOrderById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create order' })
  createOrder(
    @GetUser() user: User,
    @Body() order: CreateOrderRequest,
  ): Promise<Order> {
    return this.orderService.createOrder({
      ...order,
      userOrder: {
        ...order.userOrder,
        userId: user.id,
      },
    });
  }

  @Patch(':id')
  @HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
  @ApiOperation({ summary: 'Update order' })
  updateOrder(
    @Param('id') id: string,
    @Body() order: UpdateOrderRequest,
  ): Promise<Order> {
    return this.orderService.updateOrder({
      id,
      ...order,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  @HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
  deleteOrder(@Param('id') id: string): Promise<StatusResponse> {
    return this.orderService.deleteOrder(id);
  }
}
