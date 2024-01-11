import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import {
  IProduct,
  IProductsOfPage,
  IProductView,
  IQueryObjectCategory,
  IQueryObjectCategoryFilter,
} from '@/types';

export const fetchProducts = createAsyncThunk<IProductsOfPage, { query: string; locale: string }>(
  'products/fetchAll',
  async (query) => {
    const productsResponse = await axiosApi.get<IProductsOfPage>(`/products?page=${query.query}`);
    const { productsOfPage, totalPages, currentPage } = productsResponse.data;
    return {
      productsOfPage: productsOfPage,
      totalPages,
      currentPage,
    };
  },
);

export const fetchProductsFilter = createAsyncThunk<
  IProductsOfPage,
  { query: { sort: string; page: string }; locale: string }
>('products/fetchAllFilter', async (query) => {
  const productsResponse = await axiosApi.get<IProductsOfPage>(
    `/products?page=${query.query.page}&sort=${query.query.sort}`,
  );
  const { productsOfPage, totalPages, currentPage } = productsResponse.data;
  return {
    productsOfPage: productsOfPage,
    totalPages,
    currentPage,
  };
});

export const fetchProductsSearch = createAsyncThunk<
  IProductsOfPage,
  { query: { q: string; page: string }; locale: string }
>('products/fetchAllSearch', async (query) => {
  const productsResponse = await axiosApi.get<IProductsOfPage>(
    `/products/search?page=${query.query.page}&q=${query.query.q}`,
  );
  const { productsOfPage, totalPages, currentPage } = productsResponse.data;
  return {
    productsOfPage: productsOfPage,
    totalPages,
    currentPage,
  };
});

export const fetchProductsByCategory = createAsyncThunk<
  IProductsOfPage,
  {
    query: IQueryObjectCategory;
    locale: string;
  }
>('products/fetchByCategory', async (query) => {
  const productsResponse = await axiosApi.get<IProductsOfPage>(
    `/products?categoryId=${query.query.categoryId}&categoryPage=${query.query.categoryPage}`,
  );
  const { productsOfPage, totalPages, currentPage } = productsResponse.data;
  return {
    productsOfPage: productsOfPage,
    totalPages,
    currentPage,
  };
});

export const fetchProductsByCategoryFiler = createAsyncThunk<
  IProductsOfPage,
  {
    query: IQueryObjectCategoryFilter;
    locale: string;
  }
>('products/fetchByCategoryFilter', async (query) => {
  const productsResponse = await axiosApi.get<IProductsOfPage>(
    `/products?categoryId=${query.query.categoryId}&categoryPage=${query.query.categoryPage}&sort=${query.query.sort}`,
  );
  const { productsOfPage, totalPages, currentPage } = productsResponse.data;
  return {
    productsOfPage: productsOfPage,
    totalPages,
    currentPage,
  };
});

export const fetchBestsellers = createAsyncThunk<IProduct[], { type: string; locale: string }>(
  'products/fetchByFilter',
  async (query) => {
    const productsResponse = await axiosApi.get<IProduct[]>(`/products?filterBy=${query.type}`, {
      headers: { 'Accept-Language': query.locale },
    });
    return productsResponse.data;
  },
);

export const getProduct = createAsyncThunk(
  'products/getOne',
  async (query: { id: string; locale: string }) => {
    const [productResponse, relatedProductsResponse] = await Promise.all([
      axiosApi<IProductView>(`/products/${query.id}`),
      axiosApi<IProduct[]>(`/products/${query.id}/relatedProducts`),
    ]);

    const product = productResponse.data;
    const relatedProductsOne = relatedProductsResponse.data;

    return { oneProduct: product, relatedProducts: relatedProductsOne };
  },
);

export const fetchProductsPromotion = createAsyncThunk<
  IProductsOfPage,
  { query: string; locale: string }
>('products/fetchPromotion', async (query) => {
  const productsResponse = await axiosApi.get<IProductsOfPage>(`/promotion?page=${query.query}`);
  const { productsOfPage, totalPages, currentPage } = productsResponse.data;
  return {
    productsOfPage: productsOfPage,
    totalPages,
    currentPage,
  };
});
