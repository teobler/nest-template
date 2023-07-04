import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { CheckoutService } from "src/checkout/checkout.service";
import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { OrderItemDto } from "src/checkout/dto/add-item.dto";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";

@ApiTags("checkout")
@Controller("checkout")
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get("/cart")
  @ApiQuery({ name: "forceNewCart", type: "string", required: false })
  async getOrCreateCart(@Query() forceNewCart: "true" | undefined) {
    return await this.checkoutService.getOrCreateCart(forceNewCart);
  }

  @Post("/cart-items/:id")
  @ApiParam({ name: "id", type: "string" })
  async addItem(@Body() orderItem: OrderItemDto, @Param() id: string) {
    return await this.checkoutService.addItem(orderItem, id);
  }

  @Put("/cart-items/:id")
  @ApiParam({ name: "id", type: "string" })
  async updateItem(@Body() orderItem: OrderItemDto, @Param() id: string) {
    return await this.checkoutService.updateItem(orderItem, id);
  }
}
