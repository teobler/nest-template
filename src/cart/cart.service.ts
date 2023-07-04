import { Injectable } from "@nestjs/common";
import { OrderItemDto } from "src/cart/dto/add-item.dto";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { Clients } from "src/http-clients";

@Injectable()
export class CartService {
  constructor(private readonly clients: Clients) {}

  async addItems(orderItem: OrderItemDto, @Param() id: string): Promise<OrderFormItem[]> {
    const currentItems = await this.clients.checkout.getAllOrdersCart(id).then((res) => res.items);
    const updatedItem = this.updateItemQuantity(currentItems, orderItem);

    return await this.clients.checkout.addItem(id, updatedItem).then((res) => res.items);
  }

  updateItemQuantity = (currentItems: OrderFormItem[], orderItem: OrderItem): OrderItem => {
    const itemIndex = currentItems.findIndex((item) => item.id === orderItem.id);

    if (itemIndex !== -1) {
      orderItem.quantity += currentItems[itemIndex].quantity;
    }

    return orderItem;
  };
}
