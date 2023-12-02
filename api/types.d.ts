export interface IUserApi {
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  token: string;
  role: string;
  displayName: string;
  phone: string;
  googleID?: string;
  address?: string;
}

export interface IProductPost {
  category: string;
  title: string;
  oldPrice: number;
  actualPrice: number;
  description: string;
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
  user: string;
  totalPrice: number;
  address: string;
  kits: IKits[];
  dateTime: string;
  status: boolean;
}

export interface ICategoryPost {
  translations: {
    en: {
      title: string;
      description?: string;
    };
    ru: {
      title: string;
      description?: string;
    };
    kg: {
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
