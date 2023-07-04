import { Body, Controller, Post } from "@nestjs/common";
import { CartService } from "src/cart/cart.service";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { OrderItemDto } from "src/cart/dto/add-item.dto";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";

@ApiTags("cart")
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("/add/:id")
  @ApiParam({ name: "id", type: "string" })
  async addItems(@Body() orderItem: OrderItemDto, @Param() id: string): Promise<OrderFormItem[]> {
    return await this.cartService.addItems(orderItem, id);
  }
}
