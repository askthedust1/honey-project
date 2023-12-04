export type BestsellerVariant = 'new' | 'hit';

export interface RegisterMutation {
  email: string;
  password: string;
  passwordConfirm: string;
  displayName: string;
  phone: string;
  address: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  phone: string;
  googleID?: string;
  address?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IProductView {
  _id: string;
  category: {
    _id: string;
    title: string;
  };
  title: string;
  oldPrice: number;
  actualPrice: number;
  description: string;
  image: string;
  amount: number;
  isActive: boolean;
  isHit: boolean;
  datetime: string;
}

export interface IProduct {
  _id: string;
  category: string;
  title: string;
  oldPrice: number;
  actualPrice: number;
  description: string;
  image: string;
  amount: number;
  isActive: boolean;
  isHit: boolean;
  datetime: string;
}

export interface IProductsOfPage {
  productsOfPage: IProduct[];
  currentPage: number;
  totalPages: number;
}

export interface ICategory {
  _id: string;
  title: string;
  description?: string;
  image: string | '';
  isActive: boolean;
}

export interface ICategoryPost {
  _id: string;
  image: string | '';
  translations: {
    en: {
      title: string;
      description: string;
    };
    ru: {
      title: string;
      description: string;
    };
    kg: {
      title: string;
      description: string;
    };
  };
}

export interface IAdminCategory {
  _id: string;
  translations: {
    ru: {
      title: string;
    };
  };
  image: string | '';
  isActive: boolean;
}

export interface IBanner {
  _id: string;
  description: string;
  image: string | File;
  priority: number;
  page: string;
}

export interface IBannerPost {
  description: string;
  image: File | null;
  priority: string;
  page: string;
}

export interface IQueryObjectCategory {
  categoryId: string;
  categoryPage: string;
}

export interface ICart {
  product: IProduct | IProductView;
  amount: number;
}

export interface ICheck {
  userCheck: boolean;
  message: string;
}

export interface IAdminMainInfo {
  productAmount: number;
  categoriesAmount: number;
  usersAmount: number;
  transactionsAmount: number;
  sumAmount: number;
}

export interface IAdminMainHit {
  amount: number;
  product: {
    translations: {
      ru: {
        title: string;
      };
    };
    actualPrice: number;
    image: string;
    title: string;
    category: {
      translations: {
        ru: {
          title: string;
        };
      };
    };
  };
  sum: number;
}

export interface IProductOfKits {
  product: IProduct;
  amount: number;
  price: number;
}

export interface IOrder {
  user: IUser;
  address: string;
  totalPrice: number;
  status: boolean;
  dateTime: string;
  kits: IProductOfKits[];
}

export interface OrderMutation {
  product: string;
  amount: number;
}

export interface IFullOrder {
  kits: OrderMutation[];
  address: string;
  dateTime: string;
}
  