import '@/styles/_globals.scss';
import '@/styles/main.scss';
import '@/styles/products.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import React from 'react';
import { Layouts } from '@/components/common/Layouts';
import { MyAppProps } from '@/components/common/types';

const App = ({ Component, ...rest }: MyAppProps) => {
  const Layout = Layouts[Component.Layout] ?? ((page: any) => page);
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
      {/*<Header />*/}
      {/*<Component {...props.pageProps} />*/}
      {/*<Footer />*/}
    </Provider>
  );
};

export default appWithTranslation(App /*, nextI18NextConfig */);
