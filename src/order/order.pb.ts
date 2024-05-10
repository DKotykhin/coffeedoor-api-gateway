// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.174.0
//   protoc               v4.25.3
// source: proto/order.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "order";

export interface Order {
  id: string;
  userName: string;
  userId: string;
  phoneNumber: string;
  deliveryWay: string;
  deliveryAddress: string;
  orderStatus: string;
  comment: string;
  totalSum: number;
  averageSum: number;
  totalQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderWithItems {
  id: string;
  userName: string;
  userId: string;
  phoneNumber: string;
  deliveryWay: string;
  deliveryAddress: string;
  orderStatus: string;
  comment: string;
  totalSum: number;
  averageSum: number;
  totalQuantity: number;
  createdAt: string;
  updatedAt: string;
  orderItem: OrderItem[];
}

export interface OrderList {
  orderList: OrderWithItems[];
}

export interface OrderItem {
  id: string;
  slug: string;
  categoryTitle: string;
  itemTitle: string;
  price: number;
  quantity: number;
  weight: number;
}

export interface UserOrder {
  userName: string;
  phoneNumber: string;
  userId?: string | undefined;
  deliveryWay?: string | undefined;
  deliveryAddress?: string | undefined;
  comment?: string | undefined;
}

export interface UserOrderItem {
  slug: string;
  categoryTitle: string;
  itemTitle: string;
  price: number;
  quantity: number;
  weight?: number | undefined;
}

export interface CreateOrderRequest {
  userOrder: UserOrder | undefined;
  orderItems: UserOrderItem[];
}

export interface UpdateOrderRequest {
  id: string;
  userName?: string | undefined;
  userId?: string | undefined;
  phoneNumber?: string | undefined;
  deliveryWay?: string | undefined;
  deliveryAddress?: string | undefined;
  orderStatus?: string | undefined;
  comment?: string | undefined;
  totalSum?: number | undefined;
  averageSum?: number | undefined;
  totalQuantity?: number | undefined;
}

export interface Id {
  id: string;
}

export interface StatusResponse {
  status: boolean;
  message: string;
}

export const ORDER_PACKAGE_NAME = "order";

export interface OrderServiceClient {
  getOrderById(request: Id): Observable<OrderWithItems>;

  getOrdersByUserId(request: Id): Observable<OrderList>;

  createOrder(request: CreateOrderRequest): Observable<Order>;

  updateOrder(request: UpdateOrderRequest): Observable<Order>;

  deleteOrder(request: Id): Observable<StatusResponse>;
}

export interface OrderServiceController {
  getOrderById(request: Id): Promise<OrderWithItems> | Observable<OrderWithItems> | OrderWithItems;

  getOrdersByUserId(request: Id): Promise<OrderList> | Observable<OrderList> | OrderList;

  createOrder(request: CreateOrderRequest): Promise<Order> | Observable<Order> | Order;

  updateOrder(request: UpdateOrderRequest): Promise<Order> | Observable<Order> | Order;

  deleteOrder(request: Id): Promise<StatusResponse> | Observable<StatusResponse> | StatusResponse;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getOrderById", "getOrdersByUserId", "createOrder", "updateOrder", "deleteOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
