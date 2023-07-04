import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OrderItemDto implements OrderItem {
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly seller: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly index: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;
}
