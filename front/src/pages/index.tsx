import Footer from '@/components/UI/footer/Footer';
import Header from '@/components/UI/header/Header';
import HomePage from "@/components/home/HomePage";
import CategoriesList from "@/components/UI/categories/CategoriesList";
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {fetchCategories} from "@/features/categories/categoriesThunk";

const Home = () => {
  return (
    <>
      <Header />
      <main>
          <HomePage/>
        <CategoriesList />
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  await store.dispatch(fetchCategories());

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer', 'home'])),
    },
  };
});

export default Home;
