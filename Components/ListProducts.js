import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../styles/List.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getOrdering, getProducts, getProductsByCategory, setCategoryName, setOrder, searchProducts } from './../redux/reducers/lingerie-reducer';

const ListProducts = ({ list, setCurrentPage }) => {
    const [bg, setBg] = useState(false)
    const { order } = useSelector(state => state?.lingerie)
    const [showOrder, setShowOrder] = useState(false)
    const dispatch = useDispatch()

    const ordering = (name) => {
        setCurrentPage(1)
        dispatch(getOrdering(name))
        setShowOrder(!showOrder)
        dispatch(setCategoryName(''))
    }
    const showProductCategory = (categoryName) => {
        dispatch(setOrder(''))
        setCurrentPage(1)
        setShowOrder(false)
        dispatch(getProductsByCategory(categoryName))
    }

    const search = (e) => {
        dispatch(setOrder(''))
        dispatch(setCategoryName(''))
        setCurrentPage(1)
        e.target.value.length >= 3 ? dispatch(searchProducts(e.target.value)) : dispatch(getProducts())
    }
    return (

        <div className={styles.wrapper}>
            <div className={styles.list_container}>
                <div className={styles.category_wrapper}>
                    <div className={bg ? styles.bg_shadow : null}></div>
                    <div className={styles.top_block_category}>
                        <input onChange={() => setBg(!bg)} id='toggle' className={styles.toggle} type="checkbox" />
                        <label className={styles.label_category} htmlFor="toggle">
                            <h2 id='toggle' className={styles.toggle_category}>Категории</h2>
                        </label>
                        <div className={styles.search_block}>
                            <input onChange={(e) => search(e)} className={styles.search} type="search" placeholder='поиск' />
                        </div>

                        <div className={styles.list_category}>
                            <label htmlFor="toggle" className={styles.btn}>
                                <span></span>
                            </label>
                            <h2>Категории</h2>
                            <label htmlFor="toggle">
                                <li className={`${styles.categories} ${styles.all}`} onClick={() => {
                                    dispatch(setOrder(''))
                                    setShowOrder(false)
                                    dispatch(getProducts())
                                    setCurrentPage(1)
                                }}>Все товары</li>
                            </label>
                            {list && list.map(c => (
                                <label key={c.id} htmlFor='toggle'>
                                    <li
                                        onClick={() => {
                                            showProductCategory(c.name)
                                        }}
                                        className={styles.categories}>
                                        {c.name}
                                    </li>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.order_wrapper}>
                        <p className={styles.line}>|</p>
                        <div className={styles.category}>
                            <p
                                onClick={() => showOrder ? ordering('-is_new') : ordering('is_new')}
                                className={styles.ordering}>по новизне</p>
                            {order == 'is_new' || order == '-is_new' ? <Image className={showOrder ? styles.arrow_up : styles.arrow_down} src={'/greenArrow.png'} height={13} width={13} alt='greenArrow' /> : null}
                        </div>
                        <div className={styles.category}>
                            <p
                                onClick={() => showOrder ? ordering('-price') : ordering('price')}
                                className={styles.ordering}>по цене</p>
                            {order == 'price' || order == '-price' ? <Image className={showOrder ? styles.arrow_up : styles.arrow_down} src={'/greenArrow.png'} height={13} width={13} alt='greenArrow' /> : null}
                        </div>
                        <div className={styles.category}>
                            <p
                                onClick={() => showOrder ? ordering('-discount') : ordering('discount')}
                                className={styles.ordering}>по размеру скидки</p>
                            {order == 'discount' || order == '-discount' ? <Image className={showOrder ? styles.arrow_up : styles.arrow_down} src={'/greenArrow.png'} height={13} width={13} alt='greenArrow' /> : null}
                        </div>
                    </div>


                </div>

            </div>
        </div >

    );
};

export default ListProducts;