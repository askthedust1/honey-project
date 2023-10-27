export interface IUserApi {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleID?: string;
    image?: string | null;
}

export interface IProductPost {
    category: string;
    title: string;
    price: string;
    description?: string;
    image?: string;
}

