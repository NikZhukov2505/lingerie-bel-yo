import React, { useEffect, useRef, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import styles from '../styles/Paginator.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './../redux/reducers/lingerie-reducer';
import { useRouter } from 'next/router';

const Paginator = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(12)
    const { products, order, categoryName } = useSelector(state => state?.lingerie)
    const dispatch = useDispatch()
    const router = useRouter()


    useEffect(() => {
        setCurrentPage(1)
    }, [order, categoryName])

    useEffect(() => {
        dispatch(getProducts(currentPage, order, categoryName))

    }, [currentPage])

    return (
        <div className={styles.pagination_wrapper}>
            <Pagination
                defaultPage={1}
                page={currentPage}
                onChange={(e, page) => {
                    setCurrentPage(page)
                    router.push(`/?page=${page}`, undefined, { shallow: true })
                }}
                count={Math.ceil(products?.count / pagesCount)} size="large" />
        </div>
    );
};

export default Paginator;