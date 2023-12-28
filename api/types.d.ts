export interface IUserApi {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  phone: string;
  googleID?: string;
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
}

export interface ICategoryPost {
  translations: {
    [key: string]: {
      title: string;
      description?: string;
    };
  };
  image: string;
}

export interface IBannerPost {
  translations: {
    en: {
      image?: string;
    };
    ru: {
      image?: string;
    };
    kg: {
      image?: string;
    };
  };
  description: string;
}

export interface IBanner {
  image?: string;
  description: string;
}
