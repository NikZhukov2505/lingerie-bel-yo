import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css'
import Navigation from './Navigation';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { searchProducts, setCategoryName, setCurrentPage, setOrder } from '../redux/reducers/lingerie-reducer';
import { getProducts, setItems } from './../redux/reducers/lingerie-reducer';
import 'animate.css'



const Header = () => {
    const dispatch = useDispatch()
    const { info } = useSelector(state => state?.info)
    const router = useRouter()
    const [showPhones, setShowPhones] = useState(false)
    const [products, setProducts] = useState([])
    const { items } = useSelector(state => state.lingerie)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('lingeries'))
        if (data != null || data != undefined) {
            setProducts(JSON.parse(localStorage.getItem('lingeries')));
        }
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('lingeries'))
        if (data != null || data != undefined) {
            setProducts(JSON.parse(localStorage.getItem('lingeries')));
        } else setProducts([])
    }, [items])

    const search = (e) => {
        dispatch(setOrder(''))
        dispatch(setCategoryName(''))
        e.target.value.length >= 3 ? dispatch(searchProducts(e.target.value)) : dispatch(getProducts())
    }

    return (
        <header id='top' className={router.pathname == '/' ? styles.header : null}
            style={{ backgroundImage: router.pathname == '/' ? `url(http://195.38.164.87:8000${info?.image})` : null }}>
            <div className={styles.header_wrapper}>
                <div className={styles.logo}>
                    <Link href={'/'} title='На главную'>
                        <Image src={`http://195.38.164.87:8000${info?.logo}`}
                            loader={() => `http://195.38.164.87:8000${info?.logo}`}
                            alt={'logo'}
                            width={250}
                            height={100}
                            className={styles.img_logo}
                            unoptimized={true}
                            priority
                        />
                    </Link>
                </div>
                <Navigation />
                <div className={styles.space}></div>
                <div className={styles.search_block}>
                    <input onChange={(e) => search(e)} className={styles.search} type="search" placeholder='поиск' />
                </div>

                <div className={styles.header_basket_block}>
                    <div className={styles.header_basket_count}>
                        <Link href={'/basket/'}>
                            <Image src={'/корзина.png'}
                                alt='basket'
                                width={30}
                                height={30}
                                layout='responsive'
                                title='Корзина'
                            />
                        </Link>
                        {router.pathname == '/basket' ? null : products.length > 0 ? <span className={styles.total_count}>
                            {
                                products?.reduce((total, el) => {
                                    total += el.count
                                    return total
                                }, 0) || 0
                            }
                        </span> : null}
                    </div>
                    <div
                        onClick={() => setShowPhones(!showPhones)}
                        className={styles.connection}>
                        <Image
                            src={'/phone.png'}
                            alt={'phone'}
                            width={30}
                            height={30}
                            layout='responsive'
                        />
                        <Image
                            src={'/стрелка.png'}
                            alt={'arrow'}
                            width={14}
                            height={14}
                            layout='responsive'
                        />
                        <span style={{ display: showPhones ? 'inline' : 'none' }} className={`${styles.number} animate__animated animate__flipInX`}><a href={`tel:${info?.phone_number}`}>{info?.phone_number}</a></span>
                    </div>
                </div>
            </div>
            <div
                className={router.pathname == '/' ? styles.header_bottom_block : styles.div_none}>
                <h2 className={styles.text1}>{info?.text1}</h2>
                <h2 className={styles.text2}>{info?.text2}</h2>
            </div>

        </header>
    );
};



export default Header;