import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CheckoutService } from "src/checkout/checkout.service";
import { CheckoutController } from "src/checkout/checkout.controller";
import { Clients } from "src/http-clients";

@Module({
  providers: [CheckoutService, Clients],
  controllers: [CheckoutController],
})
export class CheckoutModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    return;
  }
}
