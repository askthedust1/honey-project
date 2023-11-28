import '@/styles/_globals.scss';
import '@/styles/main.scss';
import '@/styles/products.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import Header from '@/components/UI/header/Header';
import Footer from '@/components/UI/footer/Footer';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Header />
      <Component {...props.pageProps} />
      <Footer />
    </Provider>
  );
};

export default appWithTranslation(App /*, nextI18NextConfig */);
