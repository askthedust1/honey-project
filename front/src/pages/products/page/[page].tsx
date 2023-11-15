import React from 'react';
import ProductsAll from "@/features/products/ProductsAll";
import {wrapper} from "@/store/store";
import {fetchProducts} from "@/features/products/productsThunk";
import Pagination from "@/components/UI/pagination/Pagination";
import {useAppSelector} from "@/store/hook";
import {selectCurrentPage, selectTotalPages} from "@/features/products/productsSlice";

const ProductPage = () => {

    const currentPageState = useAppSelector(selectCurrentPage);
    const totalPagesState = useAppSelector(selectTotalPages);
    console.log(totalPagesState);

    return (
        <>
            <ProductsAll/>
            {totalPagesState > 0 ? <Pagination/> : <></> }
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const currentPage = context.params?.page;
    await store.dispatch(fetchProducts(currentPage as string));
    return {props: {}};
});

export default ProductPage;