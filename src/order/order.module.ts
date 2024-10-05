import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from './infrastructure/presentation/order.controller';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import { CreateOrderService } from 'src/order/application/use-case/create-order.service';
import { PayOrderService } from 'src/order/application/use-case/pay-order.service';
import { CancelOrderService } from 'src/order/application/use-case/cancel-order.service';
import { SetInvoiceAddressOrderService } from 'src/order/application/use-case/set-invoice-address-order.service';
import { SetShippingAddressOrderService } from 'src/order/application/use-case/set-shipping-address-order.service';
import OrderRepositoryTypeOrm from 'src/order/infrastructure/persistance/order.repository';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { GenerateInvoiceService } from 'src/order/application/use-case/generate-invoice.service';
import { PdfGeneratorServiceInterface } from 'src/order/domain/port/pdf/pdf-generator.service.interface';
import { PdfGeneratorService } from 'src/order/infrastructure/pdf/pdf-generator.service';
import { ProductRepositoryInterface } from '../product/domain/port/product.repository.interface';
import ProductTypeOrmRepository from '../product/infrastructure/persistance/product-type-orm.repository';
import { AddProductOrderService } from './application/use-case/add-product-order.service';
import { MailSenderServiceInterface } from './domain/port/mail/mail-sender.service.interface';
import { MailSenderCustomService } from './infrastructure/mail/mail-sender-custom.service';
import PromotionRepositoryInterface from '../promotion/domain/port/promotion.repository.interface';
import PromotionTypeOrmRepository from '../promotion/infrastructure/persistance/promotion-type-orm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],

  providers: [
    OrderRepositoryTypeOrm,
    PdfGeneratorService,
    ProductTypeOrmRepository,
    PromotionTypeOrmRepository,
    MailSenderCustomService,

    {
      provide: GenerateInvoiceService,
      useFactory: (
        orderRepository: OrderRepositoryInterface,
        pdfGeneratorService: PdfGeneratorServiceInterface,
      ) => {
        return new GenerateInvoiceService(orderRepository, pdfGeneratorService);
      },
      inject: [OrderRepositoryTypeOrm, PdfGeneratorService],
    },

    {
      provide: PayOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new PayOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetInvoiceAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetInvoiceAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetShippingAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetShippingAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    // pour pouvoir gérer l'inversion de dépendance
    // du service CreateOrderService
    // j'utilise le système de useFactory de nest
    {
      // quand j'enregistre la classe CreateOrderService
      provide: CreateOrderService,
      // je demande à Nest Js de créer une instance de cette classe
      useFactory: (
        orderRepository: OrderRepositoryInterface,
        productRepository: ProductRepositoryInterface,
        mailSenderService: MailSenderServiceInterface,
        promotionRepository: PromotionRepositoryInterface,
      ) => {
        return new CreateOrderService(
          orderRepository,
          productRepository,
          mailSenderService,
          promotionRepository,
        );
      },
      // en lui injectant une instance de OrderRepositoryTypeOrm
      // à la place de l'interface qui est utilisée dans le constructeur de CreateOrderService
      inject: [
        OrderRepositoryTypeOrm,
        ProductTypeOrmRepository,
        MailSenderCustomService,
        PromotionTypeOrmRepository,
      ],
    },
    AddProductOrderService,
  ],
})
export class OrderModule {}
