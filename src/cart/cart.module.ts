import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CartService } from "src/cart/cart.service";
import { CartController } from "src/cart/cart.controller";
import { Clients } from "src/http-clients";

@Module({
  providers: [CartService, Clients],
  controllers: [CartController],
})
export class CartModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    return;
  }
}
