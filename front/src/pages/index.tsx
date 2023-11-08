import Products from "@/features/products/Products";
import {wrapper} from "@/store/store";
import {fetchProducts} from "@/features/products/productsThunk";

const Home = () => {
  return (
    <>
      <Products />
    </>
  )
}

Home.getInitialProps = wrapper.getInitialPageProps(store => async () => {
    await store.dispatch(fetchProducts());
    return {name: 'Products'};
});

export default Home;