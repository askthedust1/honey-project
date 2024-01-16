export interface IUserApi {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  phone: string;
  address?: string;
}

export interface IProductPost {
  category: {
    translations: {
      [key: string]: {
        title: string;
      };
    };
  };
  translations: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
  oldPrice: number;
  actualPrice: number;
  image: string;
  amount: number;
}

export interface IKits {
  product: string;
  amount: number;
  price: number;
}

export type IKitsMutation = Omit<IKits, 'price'>;

export interface ITransactionPost {
  indexNumber: number;
  user: string;
  totalPrice: number;
  address: string;
  kits: IKits[];
  dateTime: string;
  status: boolean;
  payment: string;
}

export interface Category {
  _id: Types.ObjectId;
}

export interface ProductTranslations {
  [key: string]:
    | {
        title: string;
        description: string;
      }
    | undefined;
}

export interface IProduct {
  category: Types.ObjectId | Category;
  oldPrice: number;
  actualPrice: number;
  image: string;
  amount: number;
  isActive: boolean;
  isHit: boolean;
  datetime: string;
  translations: ProductTranslations;
}
