import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import Header from "@/components/UI/header/Header";
import Footer from "@/components/UI/footer/Footer";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
        <header>
            <Header/>
        </header>
        <main>
            <Component {...props.pageProps} />
        </main>
        <footer>
            <Footer/>
        </footer>
    </Provider>
  );
};

export default appWithTranslation(App /*, nextI18NextConfig */);
