// types/ProductTypes.ts

// Define a type for Product Reviews
export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

// Define a type for Product Dimensions
export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

// Define a type for Product Meta Information
export type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

// Define the main Product type
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
};

// Define a response type for the product API
export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
