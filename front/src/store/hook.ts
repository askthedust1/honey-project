import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, RootStore } from './store';
import { ICategoryPost, IProductOne } from '@/types';

// interface TranslationData {
//   translations?: {
//     [key: string]: {
//       [key: string]: string;
//     };
//   };
// }

// type TModulePayload = (TranslationData & ICategoryPost) | (TranslationData & IProductOne);

export const useAppDispatch = () => useDispatch<RootStore['dispatch']>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useTranslation = (data: TModulePayload[], lang: string | undefined) => {
//   return data.map((i) => {
//     const translations = i.translations ? i.translations[lang || 'ru'] : null;
//     const fit = {
//       ...i,
//       ...translations,
//     };
//
//     delete fit.translations;
//     return fit;
//   });
// };
//
// export const useTranslationObject = (data: TModulePayload, lang: string | undefined) => {
//   const obj = data.translations ? data.translations[lang || 'ru'] : null;
//   const trans = {
//     ...data,
//     ...obj,
//   };
//
//   delete trans.translations;
//   return trans;
// };
