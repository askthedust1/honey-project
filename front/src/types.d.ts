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

export interface ICategory {
    _id: string;
    title: string;
    description?: string;
}