import Products from '@/features/products/Products';
import Footer from '@/components/UI/footer/Footer';
import { wrapper } from '@/store/store';
import { fetchProducts } from '@/features/products/productsThunk';
import Header from '@/components/UI/header/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Products />
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  await store.dispatch(fetchProducts());

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
    },
  };
});

export default Home;
