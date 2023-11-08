import Products from "@/features/products/Products";
import {wrapper} from "@/store/store";
import {fetchProducts} from "@/features/products/productsThunk";
import Footer from "@/components/UI/footer/Footer";

const Home = () => {
  return (
    <>
        <header>

        </header>
        <main>
            <Products />
        </main>
        <Footer />
    </>
  )
}

Home.getInitialProps = wrapper.getInitialPageProps(store => async () => {
    await store.dispatch(fetchProducts());
    return {name: 'Products'};
});

export default Home;