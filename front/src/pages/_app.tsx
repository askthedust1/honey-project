import React from 'react';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import { wrapper } from '@/store/store';
import { Layouts } from '@/components/common/Layouts';
import { MyAppProps } from '@/components/common/types';
import '@/styles/_globals.scss';
import '@/styles/_main.scss';
import '@/styles/_products.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = ({ Component, ...rest }: MyAppProps) => {
  const Layout = Layouts[Component.Layout] ?? ((page: any) => page);
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <NextNProgress color={'#FF8F31'} />
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
};

export default appWithTranslation(App /*, nextI18NextConfig */);
