import { Injectable } from "@nestjs/common";
import { OrderItemDto } from "src/checkout/dto/add-item.dto";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { Clients } from "src/http-clients";

@Injectable()
export class CheckoutService {
  constructor(private readonly clients: Clients) {}

  async addItem(orderItem: OrderItemDto, @Param() id: string) {
    const currentItems = await this.clients.checkout.getAllOrdersCart(id).then((res) => res.items);
    const updatedItem = this.updateItemQuantity(currentItems, orderItem);

    return await this.clients.checkout.addItem(id, updatedItem).then((res) => res.items);
  }

  async updateItem(orderItem: OrderItemDto, id: string) {
    return await this.clients.checkout.updateItem(id, orderItem).then((res) => res.items);
  }

  async getOrCreateCart(forceNewCart: "true" | undefined) {
    return await this.clients.checkout.getOrCreateCart(forceNewCart === "true");
  }

  private updateItemQuantity = (currentItems: OrderFormItem[], orderItem: OrderItem): OrderItem => {
    const itemIndex = currentItems.findIndex((item) => item.id === orderItem.id);

    if (itemIndex !== -1) {
      orderItem.quantity += currentItems[itemIndex].quantity;
    }

    return orderItem;
  };
}
