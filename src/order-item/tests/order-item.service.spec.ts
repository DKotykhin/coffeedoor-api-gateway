import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from '../order-item.service';

describe('OrderItemService', () => {
  let service: OrderItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        {
          provide: 'ORDER_ITEM_SERVICE',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OrderItemService>(OrderItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
