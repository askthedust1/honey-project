export interface IUserApi {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    phone: string;
}

export interface IProductPost {
    category: string;
    title: string;
    price: string;
    description?: string;
    image?: string;
}

