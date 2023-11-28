import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, RootStore } from './store';

interface TranslationData {
  translations: {
    ru: {
      [key: string]: string;
    };
    en: {
      [key: string]: string;
    };
    kg: {
      [key: string]: string;
    };
  };
}

export const useAppDispatch = () => useDispatch<RootStore['dispatch']>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTranslation = (data: TranslationData[], lang: string | undefined) => {
    return data.map((i) => {
      const fit = {
        ...i,
        ...i.translations?[lang || 'ru'],
      };

      delete fit.translations;
      return fit;
    });
};
