export interface IProduct {
    _id: string;
    category: string;
    title: string;
    price: number;
    description?: string;
    image: string;
    amount: number;
    isActive: boolean;
}