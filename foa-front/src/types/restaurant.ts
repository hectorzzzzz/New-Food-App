//file to define type of data (restaurant, dish, cart items, pagination, order)

export interface Restaurant {
    _id: string;
    name: string;
    alamat: string;
    description: string;
    rating: number;
    image?: string;
}
  
export interface Dish {
    _id: string;
    restaurant: Partial<Restaurant & { _id: string }>;
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    image?: string;
}
  
export interface CartItem {
    _id: string;
    restaurant: Partial<Restaurant & { _id: string }>;
    dish: Partial<Dish & { _id: string }>;
    quantity: number;
}
  
export interface GetPaginationResponse<T> {
    currentPage: number;
    items: T[];
    totalDocuments: number;
    totalPages: number;
}
  
export interface GetCheckoutDetailsResponse {
    carts: CartItem[];
    totalPrice: number;
    totalDiscounterPrice: number;
}
  
export interface Order {
    _id: string;
    status: string;
    restaurant: Restaurant;
    carts: CartItem[];
}