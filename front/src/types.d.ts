export type BestsellerVariant = 'new' | 'hit';

export interface RegisterMutation {
  email: string;
  password: string;
  passwordConfirm: string;
  displayName: string;
  phone: string;
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
  };
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

export interface IChangeBanner {
  priority: string;
  image: string;
}
