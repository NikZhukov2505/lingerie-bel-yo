import React, { useEffect, useState } from 'react';
import { wrapper } from '../../redux';
import { getInfoStore } from './../../redux/reducers/info-reducer';
import styles from '../../styles/Basket.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { getWords, setItems } from './../../redux/reducers/lingerie-reducer';

const Basket = () => {
    const [products, setProducts] = useState([])
    const { info } = useSelector(state => state.info)
    const dispatch = useDispatch()


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('lingeries'));
        if (data != null || data != undefined) {
            setProducts(JSON.parse(localStorage.getItem('lingeries')));
        }
    }, [])

    const removeItem = (id) => {
        let all_products = JSON.parse(localStorage.getItem('lingeries')) || []
        const result = all_products.filter(item => item.id_item != id)
        setProducts(result)
        localStorage.setItem('lingeries', JSON.stringify(result))
    }

    const decrement = (id) => {
        let all_products = JSON.parse(localStorage.getItem('lingeries'))
        let minus = all_products.find(el => el.id_item == id)
        if (minus) {
            minus.count = minus.count - 1
        }
        localStorage.setItem('lingeries', JSON.stringify(all_products))
        setProducts(all_products)
    }
    const increment = (id) => {
        let all_products = JSON.parse(localStorage.getItem('lingeries'))
        let minus = all_products.find(el => el.id_item == id)
        if (minus) {
            minus.count = minus.count + 1
        }
        localStorage.setItem('lingeries', JSON.stringify(all_products))
        setProducts(all_products)
    }

    const removeLSCart = () => {
        setProducts([])
        dispatch(setItems([]))
        localStorage.removeItem('lingeries')
    }

    return (
        <div className={styles.basket}>
            <Head>
                <title>Корзина</title>
                <link rel="icon" type='image/png' href={`http://195.38.164.87:8000${info?.logo}`} />
                <meta name='author' content={info.company_name} />
                <meta name='description' content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье Купить в Бишкеке'} />
                <meta property="og:image" content={`http://195.38.164.87:8000${info?.logo}`} />
                <meta property="og:description" content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье Купить в Бишкеке'} />
                <meta property="og:title" content={info.company_name} />
                <meta property='og:url' content='http://www.underwearitaly.com/basket/' />
                <meta property='og:type' content='website' />
                <meta property='og:site_name' content='underwearitaly.com - Интернет магазин женского нижнего бельья' />
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.basket_left_block}>
                    {
                        products.length > 0 ? products?.map((el, i) => (
                            <div key={i} className={styles.basket_card}>
                                <div className={styles.card_img}>
                                    <Link href={'/product/' + el.id}>
                                        <Image
                                            src={el?.img}
                                            loader={() => el?.img}
                                            alt={el?.name}
                                            width={150}
                                            height={200}
                                            unoptimized
                                            priority
                                        />
                                    </Link>
                                </div>
                                <span onClick={() => removeItem(el.id_item)} className={styles.delete_mobile}><Image title="Удалить" src="/delete.png" alt="delete" width={30} height={30} /></span>
                                <div className={styles.card_info}>
                                    <div className={styles.delete_block}>
                                        <div className={styles.delete_block_info}>
                                            <Link href={'/product/' + el.id}>
                                                <h2>{`${el.type_name} ${el.name}`}</h2>
                                            </Link>
                                        </div>
                                        <div className={styles.delete} onClick={() => removeItem(el.id_item)}>
                                            <Image title="Удалить" src="/delete.png" alt="delete" width={30} height={30} />
                                        </div>
                                    </div>
                                    <div className={styles.about_item}>
                                        <span>{el.size}</span>
                                        <ul className={styles.list_about_item}>
                                            <li><span>цена: </span>{el.price}</li>
                                            <li className={styles.count}>
                                                <button
                                                    disabled={el.count <= 1 ? true : false}
                                                    onClick={() => decrement(el.id_item)}>-</button>
                                                <span>кол: </span>{el.count}
                                                <button
                                                    onClick={() => increment(el.id_item)}>+</button>
                                            </li>
                                            <li className={styles.result}><span>итог: </span>{el.price * el.count}</li>
                                        </ul>
                                    </div>
                                    <div className={styles.dropdown_info}>
                                        <div className={styles.about_color}>
                                            <span>цвет:</span>
                                            <span className={styles.color_button}>
                                                <img src={el.color} alt={el.color_name} title={el.color_name} />
                                            </span>
                                        </div>
                                        <div className={styles.about_product}>
                                            <p><span>Производитель: </span>{el.producer}</p>
                                            <p><span>Код: </span>{el.articul}</p>
                                            <p className={styles.result_mob}><span>итог: </span>{el.price * el.count}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                            :
                            <div className={styles.empty_block}>
                                <h1 className={styles.empty}>Ваша Корзина пуста</h1>
                                <h2>Но это легко поправить! <Link className={styles.redirect} href={'/'}>Отправляйтесь за покупками</Link> чтобы увидеть уже добавленные товары.</h2>
                            </div>
                    }
                </div>
                <div className={styles.basket_right_block}>
                    <div>
                        <div className={styles.count_products}>
                            <p className={styles.count_text}>Товаров <Image src={'/white-card.png'} alt='cart' width={22} height={22} /></p>
                            <p className={styles.count_total}>{products?.reduce((total, el) => {
                                total += el.count
                                return total
                            }, 0)}</p>
                        </div>
                        <div className={styles.total_price_products}>
                            <p className={styles.total_text}>Итоговая цена</p>
                            <p className={styles.total_sum}>{products?.reduce((sum, el) => {
                                sum += el.count * el.price
                                return sum
                            }, 0)} <span>Сом</span></p>
                        </div>
                        <div className={styles.basket_btns}>
                            <Link href={products.length > 0 ? '/basket/order' : ''}><button className={styles.order}>ОФОРМИТЬ ЗАКАЗ</button></Link>
                            <button onClick={removeLSCart} className={styles.clear_basket}>Очистить корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    await store.dispatch(getInfoStore())
    await store.dispatch(getWords())

});

export default Basket;