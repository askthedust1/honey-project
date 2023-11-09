import Products from '@/features/products/Products';
import { wrapper } from '@/store/store';
import { fetchProducts } from '@/features/products/productsThunk';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = () => {
  return (
    <>
      <main>
        <div className="container">
          <Products />
        </div>
      </main>
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
