export type ProductType = "PRODUCT" | "SERVICE";

export interface Product {
  id: number;

  name: string;
  description: string | null;

  type: ProductType;

  categoryName: string;
  categorySlug: string;

  producer: string;
  producerSlug: string;

  image: string;

  price: number | null;
}
