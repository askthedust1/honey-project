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

export interface BannerResponse {
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
  click: number;
}

export interface IProductOneView {
  _id: string;
  category: {
    _id: string;
    translations: {
      ru: {
        title: string;
      };
    };
  };
  translations: {
    ru: {
      title: string;
      description: string;
    };
    en: {
      title: string;
      description: string;
    };
    kg: {
      title: string;
      description: string;
    };
  };
  title: string;
  description?: string;
  isActive: boolean;
  isHit: boolean;
  datetime: string;
  oldPrice: number;
  actualPrice: number;
  amount: number;
  image: string;
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

export interface IProductMutation {
  _id: string;
  category: {
    translations: {
      ru: {
        title: string;
      };
    };
  };
  translations: {
    ru: {
      title: string;
    };
  };
  oldPrice: number;
  actualPrice: number;
  description: string;
  image: string;
  amount: number;
  isActive: boolean;
  isHit: boolean;
  datetime: string;
}

export interface IProductMutationNew {
  _id?: string;
  category: string;
  oldPrice: number;
  actualPrice: number;
  amount: number;
  translations: {
    ru: {
      title: string;
      description: string;
    };
    en: {
      title: string;
      description: string;
    };
    kg: {
      title: string;
      description: string;
    };
  };
  image: File | null;
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

export interface ICategoryMutation {
  idCategory?: string;
  translations: {
    ru: {
      title: string;
    };
    en: {
      title: string;
    };
    kg: {
      title: string;
    };
  };
  image: File | null;
}

export interface IAdminCategory {
  _id: string;
  translations: {
    ru: {
      title: string;
    };
    en: {
      title: string;
    };
    kg: {
      title: string;
    };
  };
  image: string | '';
  isActive: boolean;
}

export type TAdminCategory = Omit<IAdminCategory, 'id'>;

export interface IBanner {
  _id: string;
  description: string;
  image: string | null;
  priority: number;
  page: string;
}

export interface IBannerPost {
  translations: string;
  description: string;
  image: File | null;
  priority: string;
  page: string;
}

export interface IQueryObjectCategory {
  categoryId: string;
  categoryPage: string;
}

export interface IQueryObjectCategoryFilter {
  categoryId: string;
  categoryPage: string;
  sort: string;
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
    _id: string;
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

//Я здесь поменяла тип
export interface IProductOfKits {
  product: IProductOneView;
  amount: number;
  price: number;
}

export interface IOrder {
  indexNumber: number;
  user: IUser;
  address: string;
  totalPrice: number;
  status: boolean;
  dateTime: string;
  kits: IProductOfKits[];
  payment: string;
}

export interface IOrderAdminView {
  _id: string;
  indexNumber: number;
  user: IUser;
  address: string;
  totalPrice: number;
  status: boolean;
  dateTime: string;
  kits: IProductOfKits[];
  payment: string;
}

export interface IOrderAdminFullResponse {
  ordersOfPage: IOrderAdminView[];
  currentPage: number;
  totalPages: number;
}

export interface OrderMutation {
  product: string;
  amount: number;
}

export interface IFullOrder {
  kits: OrderMutation[];
  address: string;
  dateTime: string;
  payment: string;
}

export interface IOrderMutation {
  _id: string;
  phone: string;
  user: IUser;
  address: string;
  totalPrice: number;
  status: boolean;
  dateTime: string;
  kits: IKits[];
}

export interface IKits {
  product: IProductMutation;
  amount: number;
  price: number;
}

export interface AnimationState {
  y: number;
  opacity: number;
}
