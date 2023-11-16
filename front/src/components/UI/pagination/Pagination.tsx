import React from 'react';
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

                <div className={cls.pagination_inner}>


                    {currentPageState > 1 ? <div className={cls.circle_left}><Link
                            className={cls.previous}
                            href={'/products/page/' +
                                (currentPageState > 1 ? currentPageState - 1 : currentPageState)
                                    .toString()}
                        >
                            &#8249;
                        </Link></div> :
                        <div className={cls.circle_transparent}><span className={cls.span_text}>&#8249;</span></div>
                    }


                    <div className={cls.circle}>
                        <div className="inner-circle">{currentPageState} / {totalPageState}</div>
                    </div>


                    {
                        currentPageState === totalPageState ?
                            <div className={cls.circle_transparent}>
                                <span className={cls.span_text}>&#8250;</span>
                            </div> :
                            <div className={cls.circle_right}>
                                <Link className={cls.next}
                                      href={'/products/page/' + (currentPageState === totalPageState ? totalPageState
                                          : currentPageState + 1).toString()}
                                >&#8250;
                                </Link>
                            </div>
                    }


                </div>
            </div>
        </div>
    );
};

export default Pagination;