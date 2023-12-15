export class ProductModel {
  image: string;
  title: string;
  link: string;
  initialRating: number;
  price: number;
  oldPrice?: number;
  credit: number;
  description: string;
  advantages: string;
  disAdvantages?: string;
  categories: string[];
  tags: string[];
  characteristics: {
    [key: string]: string;
  };
}
