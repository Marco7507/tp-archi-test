import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CreateOrderDto,
  Order
} from "src/order/domain/entity/order.entity";
import { CreateOrderService } from 'src/order/application/use-case/create-order.service';
import { PayOrderService } from 'src/order/application/use-case/pay-order.service';
import { ProductRepositoryInterface } from "../../../product/domain/port/product.repository.interface";

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderCommand: CreateOrderDto,
  ): Promise<Order> {
    return this.createOrderService.execute(createOrderCommand);
  }

  @Post()
  async payOrder(@Param('id') id: string): Promise<Order> {
    return await this.payOrderService.execute(id);
  }
}
