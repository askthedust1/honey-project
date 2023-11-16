import React  from 'react';
import cls from './pagination.module.scss';
import Link from "next/link";
import {useAppSelector} from "@/store/hook";
import {selectCurrentPage, selectTotalPages} from "@/features/products/productsSlice";

const Pagination = () => {

    const currentPageState = useAppSelector(selectCurrentPage);
    const totalPageState = useAppSelector(selectTotalPages);

    return (
        <div className={cls.pagination_block}>
            <div className={cls.pagination_inner}>

                {currentPageState > 1 ? <Link
                    className={cls.previos}
                    href={'/products/page/' +
                        (currentPageState > 1 ? currentPageState - 1 : currentPageState)
                            .toString()}
                >
                    &laquo; Назад
                </Link> :
                    <Link href={'/products/page/' + currentPageState
                    .toString()}>Stop</Link>}

                {
                    currentPageState === totalPageState ? <Link href={'/products/page/' + totalPageState
                            .toString()}>Stop</Link> :
                        <Link className={cls.next}
                              href={'/products/page/' + (currentPageState === totalPageState ? totalPageState
                                  : currentPageState + 1).toString()}
                        >Вперед &raquo;
                        </Link>
                }
            </div>
        </div>
    );
};

export default Pagination;