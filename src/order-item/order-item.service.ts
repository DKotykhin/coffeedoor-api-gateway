import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  ORDER_ITEM_SERVICE_NAME,
  OrderItemServiceClient,
} from './order-item.pb';
import { errorCodeImplementation } from '../utils/error-code-implementation';

@Injectable()
export class OrderItemService implements OnModuleInit {
  private orderItemService: OrderItemServiceClient;
  protected readonly logger = new Logger(OrderItemService.name);
  constructor(
    @Inject('ORDER_ITEM_SERVICE')
    private readonly orderItemServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderItemService = this.orderItemServiceClient.getService(
      ORDER_ITEM_SERVICE_NAME,
    );
  }

  async findOrderItemById(id: string) {
    try {
      const response = await firstValueFrom(
        this.orderItemService.getOrderItemById({ id }),
      );
      return response;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async findOrderItemsByOrderId(orderId: string) {
    try {
      const response = await firstValueFrom(
        this.orderItemService.getOrderItemsByOrderId({ id: orderId }),
      );
      return response;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async createOrderItem(orderItem: any) {
    try {
      const response = await firstValueFrom(
        this.orderItemService.createOrderItem(orderItem),
      );
      return response;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async updateOrderItem(orderItem: any) {
    try {
      const response = await firstValueFrom(
        this.orderItemService.updateOrderItem(orderItem),
      );
      return response;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async deleteOrderItem(id: string) {
    try {
      const response = await firstValueFrom(
        this.orderItemService.deleteOrderItem({ id }),
      );
      return response;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }
}
