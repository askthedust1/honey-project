import { IProduct, IProductView } from '@/types';

interface FitProducts extends IProduct {
  translations?: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export const useProductsTranslation = (data: FitProducts[], lang: string | undefined) => {
  return data.map((i) => {
    const translations = i.translations ? i.translations[lang || 'ru'] : null;
    const fit = {
      ...i,
      ...translations,
    };

    delete fit.translations;
    return fit;
  });
};

interface FitOneProduct extends IProductView {
  translations?: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export const useProductTranslation = (data: FitOneProduct, lang: string | undefined) => {
  const translations = data.translations ? data.translations[lang || 'ru'] : null;
  const category = data.category.translations ? data.category.translations[lang || 'ru'] : null;
  const fit = {
    ...data,
    ...translations,
    category: {
      _id: data.category._id,
      title: category.title,
    },
  };

  delete fit.translations;
  return fit;
};
