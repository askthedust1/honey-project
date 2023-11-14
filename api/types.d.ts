export interface IUserApi {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  phone: string;
  googleID?: string;
}

export interface IProductPost {
  category: string;
  title: string;
  price: string;
  description?: string;
  image?: string;
}

export interface IKits {
  product: string;
  amount: number;
  price: number;
}
export type IKitsMutation = Omit<IKits, 'price'>;
export interface ITransactionPost {
  user: string;
  totalPrice: number;
  kits: IKits[];
}

export interface IBannerPost {
  description: string;
  image?: string;
}
