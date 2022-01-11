import {Variant} from "./variant";

export class Product {
  id: string;
  name: string;
  other_name: string;
  sale_price: number;
  price: number;
  variants: Variant[];
}
