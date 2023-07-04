import type { InstanceOptions, IOContext, RequestConfig } from "@vtex/api";
import { JanusClient } from "@vtex/api";

import { checkoutCookieFormat, ownershipCookieFormat } from "../utils/cookie";
import { statusToError } from "../utils";
import { CustomIOContext } from "src/clients/type";

const BASE_URL = "https://vtexsgdemostore.vtexcommercestable.com.br";

export class Checkout extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.storeUserAuthToken ? { VtexIdclientAutCookie: ctx.storeUserAuthToken } : null),
        "x-vtex-user-agent": ctx.userAgent,
      },
    });
  }

  public getOrCreateCart = (forceNewCart?: boolean) =>
    this.get<OrderForm>(this.routes.getOrCreateCart(forceNewCart), {
      metric: "checkout-get-cart-page",
    });

  public getAllOrdersCart = (orderFormId?: string | string[]) =>
    this.get<OrderForm>(this.routes.getAllOrdersCart(orderFormId), {
      metric: "checkout-cart-page",
    });

  public addItem = (orderFormId: string | string[], items: any) =>
    this.post<OrderForm>(this.routes.addItem(orderFormId), { orderItems: [items] }, { metric: "checkout-addItem" });

  public updateItem = (orderFormId: string | string[], items: any) =>
    this.post<OrderForm>(
      this.routes.updateItem(orderFormId),
      { orderItems: [items] },
      { metric: "checkout-updateItem" },
    );

  public addShippingData = (orderFormId: string | string[], shippingData: any) =>
    this.post<OrderForm>(this.routes.addShippingData(orderFormId), shippingData, {
      metric: "checkout-addShippingData",
    });

  public addPaymentData = (orderFormId: string | string[], paymentData: any) =>
    this.post<void>(
      this.routes.addPaymentData(orderFormId),
      { paymentData },
      {
        metric: "checkout-addLogisticAndPaymentData",
      },
    );

  protected get = <T>(url: string, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
      ...this.getCommonHeaders(),
    };
    config.baseURL = BASE_URL;

    return this.http.get<T>(url, config).catch(statusToError) as Promise<T>;
  };

  protected post = <T>(url: string, data?: any, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
      ...this.getCommonHeaders(),
    };
    config.baseURL = BASE_URL;

    return this.http.post<T>(url, data, config).catch(statusToError) as Promise<T>;
  };

  private getCommonHeaders = () => {
    const { orderFormId, ownerId, segmentToken, sessionToken } = this.context as CustomIOContext;

    const checkoutCookie = orderFormId ? checkoutCookieFormat(orderFormId) : "";
    const ownershipCookie = ownerId ? ownershipCookieFormat(ownerId) : "";
    const segmentTokenCookie = segmentToken ? `vtex_segment=${segmentToken};` : "";

    const sessionTokenCookie = sessionToken ? `vtex_session=${sessionToken};` : "";

    return {
      Cookie: `${checkoutCookie}${ownershipCookie}${segmentTokenCookie}${sessionTokenCookie}`,
    };
  };

  private get routes() {
    const base = "/api/checkout/pub";

    return {
      getOrCreateCart: (forceNewCart?: boolean) => `${base}/orderForm?forceNewCart=${forceNewCart}`,
      getAllOrdersCart: (orderFormId?: string | string[] | undefined) => `${base}/orderForm/${orderFormId}`,
      addItem: (orderFormId?: string | string[]) => `${base}/orderForm/${orderFormId}/items`,
      updateItem: (orderFormId?: string | string[]) => `${base}/orderForm/${orderFormId}/items/update`,
      addShippingData: (orderFormId?: string | string[]) => `${base}/orderForm/${orderFormId}/attachments/shippingData`,
      addPaymentData: (orderFormId?: string | string[]) => `${base}/orderForm/${orderFormId}/attachments/paymentData`,
    };
  }
}
