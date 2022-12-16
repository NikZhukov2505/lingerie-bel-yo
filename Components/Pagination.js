import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import styles from '../styles/Paginator.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, setCategoryName, setOrder } from './../redux/reducers/lingerie-reducer';
import { useRouter } from 'next/router';

const Paginator = ({ setCurrentPage, currentPage }) => {
    const [pagesCount] = useState(12)
    const { products, order, categoryName } = useSelector(state => state.lingerie)
    const dispatch = useDispatch()
    const router = useRouter()


    useEffect(() => {
        dispatch(getProducts(currentPage, order, categoryName))

    }, [currentPage])

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('pageKey'))
        if (data != null || data != undefined) {
            setCurrentPage(data?.page)
            dispatch(setOrder(data.order))
            dispatch(setCategoryName(data.categoryName))
            dispatch(getProducts(data.page, data.order, data.categoryName))
        }

    }, [])

    return (
        <div className={styles.pagination_wrapper}>
            <Pagination
                onChange={(e, page) => {
                    setCurrentPage(page)
                    router.push(`/?page=${page}`, undefined, { shallow: true })
                    sessionStorage.setItem('pageKey', JSON.stringify({ page, currentPage: page, order, categoryName }))
                    window.scrollTo(0, 500)
                }}
                defaultPage={1}
                page={currentPage}
                count={Math.ceil(products?.count / pagesCount)} size="large" />
        </div>
    );
};

export default Paginator;