import { ICategory } from '@/types';

interface FitCategory extends ICategory {
  translations?: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export const useCategoryTranslation = (data: FitCategory[], lang?: string | undefined) => {
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
