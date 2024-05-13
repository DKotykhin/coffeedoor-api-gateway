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

import { GetUser } from '../auth/decorators/get-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../common/types/enums';
import { UserDto } from '../user/dto/user.dto';
import { StatusResponse } from '../common/dto/status-response.dto';

import { OrderService } from './order.service';
import {
  CreateOrderDto,
  OrderDto,
  OrderWithItemsDto,
  UpdateOrderDto,
} from './dto/_index';

@ApiTags('order')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('user')
  @ApiOperation({ summary: 'Get orders by user id' })
  @ApiResponse({ status: 200, type: OrderWithItemsDto, isArray: true })
  getOrdersByUserId(@GetUser() user: UserDto): Promise<OrderWithItemsDto[]> {
    return this.orderService.findOrdersByUserId(user.id);
  }

  @Get('order/:id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({ status: 200, type: OrderWithItemsDto })
  @HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
  getOrderById(@Param('id') id: string): Promise<OrderWithItemsDto> {
    return this.orderService.findOrderById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 201, type: OrderDto })
  createOrder(
    @GetUser() user: UserDto,
    @Body() order: CreateOrderDto,
  ): Promise<OrderDto> {
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
  @ApiResponse({ status: 200, type: OrderDto })
  updateOrder(
    @Param('id') id: string,
    @Body() order: UpdateOrderDto,
  ): Promise<OrderDto> {
    return this.orderService.updateOrder({
      id,
      ...order,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, type: StatusResponse })
  @HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
  deleteOrder(@Param('id') id: string): Promise<StatusResponse> {
    return this.orderService.deleteOrder(id);
  }
}
