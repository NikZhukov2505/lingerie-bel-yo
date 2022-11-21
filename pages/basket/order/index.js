import React, { useEffect, useState } from 'react';
import { getWords } from '../../../redux/reducers/lingerie-reducer';
import { wrapper } from './../../../redux/index';
import { getInfoStore } from './../../../redux/reducers/info-reducer';
import styles from '../../../styles/Order.module.css'
import Image from 'next/image';
import { GiCash } from 'react-icons/gi'
import { BsFillCreditCard2FrontFill } from 'react-icons/bs'
import { allAPIs } from './../../../axios/index';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { setItems } from './../../../redux/reducers/lingerie-reducer';

const Order = () => {
    const { keyWords } = useSelector(state => state?.lingerie)
    const { info } = useSelector(state => state.info)
    const dispatch = useDispatch()
    const router = useRouter()
    const [namePay, setNamePay] = useState('')
    const [products, setProducts] = useState([])
    const [order, setOrder] = useState({
        email: '',
        address: '',
        first_name: '',
        last_name: '',
        phone: '',
        payment: '',
        products: []
    })

    useEffect(() => {
        const data = JSON?.parse(localStorage.getItem('lingeries'));
        if (data != null || data != undefined) {
            setProducts(data);
        }

    }, [])

    useEffect(() => {

        setOrder({
            ...order, products: products?.map(el => {
                return {
                    product_id: el.id,
                    amount: el.count,
                    size_id: el.size_id,
                    color_id: el.color_id,
                }
            }) || []
        })
    }, [products])

    const getUserData = (type, value) => {
        setOrder({ ...order, [type]: value })
    }

    const postOrder = async (e) => {
        e.preventDefault()
        if (order.email == '' || order.last_name == '' || order.first_name == '' || order.address == '' || order.email == '' || order.phone == '') {
            alert('Есть пустое поле')
        }
        else if (order.payment == '') {
            alert('Выберите способ оплаты')
        }
        else {
            allAPIs.setOrder(order)
                .then(data => {
                    localStorage.removeItem('lingeries')
                    setProducts([])
                    dispatch(setItems([]))
                    setTimeout(() => {
                        router.push('/')
                    }, 5000)
                })
                .catch(err => console.error(err))
        }
    }
    return (
        <div className={styles.order_wrapper}>
            <Head>
                <title>Корзина</title>
                <link rel="icon" type='image/png' href={`http://195.38.164.87:8000${info?.logo}`} />
                <meta name='author' content={info.company_name} />
                <meta name='description' content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье' + keyWords.join(' ') + ' Купить в Бишкеке'} />
                <meta name='keywods' content={keyWords.join(' ')} />
                <meta property="og:image" content={`http://195.38.164.87:8000${info?.logo}`} />
                <meta property="og:description" content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье' + keyWords.join(' ') + ' Купить в Бишкеке'} />
                <meta property="og:title" content={info.company_name} />
                <meta property='og:url' content='http://www.underwearitaly.com/basket/order/' />
                <meta property='og:type' content='website' />
                <meta property='og:site_name' content='underwearitaly.com - Интернет магазин женского нижнего бельья' />
            </Head>
            <div className={styles.container}>
                <div className={styles.order_left_block}>
                    <h2>Оформление заказа</h2>
                    <form id='data' onSubmit={postOrder} className={styles.form}>
                        <input onChange={(e) => getUserData('first_name', e.target.value)} placeholder='имя' type="text" />
                        <input onChange={(e) => getUserData('last_name', e.target.value)} placeholder='фамилия' type="text" />
                        <input onChange={(e) => getUserData('address', e.target.value)} placeholder='адрес' type="text" />
                        <input onChange={(e) => getUserData('phone', e.target.value)} placeholder='ном.тел' type="phone" />
                        <input onChange={(e) => getUserData('email', e.target.value)} placeholder='E-mail' type="email" />
                    </form>
                    <h3>Способ оплаты:</h3>
                    <div className={styles.payment_block}>
                        <div
                            onClick={() => {
                                setOrder({ ...order, payment: 'Наличные' })
                                setNamePay('cash')
                            }}
                            className={namePay == 'cash' ? `${styles.payment_cash} ${styles.active_cash}` : styles.payment_cash}>
                            <GiCash className={styles.cash_img} />
                            <p>наличными</p>
                        </div>
                        <div
                            onClick={() => {
                                setOrder({ ...order, payment: 'Перевод' })
                                setNamePay('card')
                            }}
                            className={namePay == 'card' ? `${styles.payment_card} ${styles.active_card}` : styles.payment_card}>
                            <BsFillCreditCard2FrontFill className={styles.pos_img} />
                            <p>перевод</p>
                        </div>
                    </div>
                    <div className={styles.order_btn_block}>
                        <p className={styles.total_sum}>Итоговая стоимость: {products?.reduce((sum, el) => {
                            sum += el.count * el.price
                            return sum
                        }, 0)} <span>Сом</span></p>
                        <button type='submit' form='data'>ОФОРМИТЬ ЗАКАЗ</button>
                    </div>
                </div>
                <div className={styles.order_right_block}>
                    {
                        products.length > 0 ? products?.map((el, i) => (
                            <div key={i} className={styles.basket_card}>
                                <div className={styles.card_img}>
                                    <Image
                                        src={el?.img}
                                        loader={() => el?.img}
                                        alt={el?.name}
                                        width={150}
                                        height={200}
                                        unoptimized
                                        priority
                                    />
                                </div>
                                <div className={styles.card_info}>
                                    <div className={styles.delete_block}>
                                        <div className={styles.delete_block_info}>
                                            <h2>{`${el.type_name} ${el.name}`}</h2>
                                        </div>
                                    </div>
                                    <div className={styles.about_item}>
                                        <span>{el.size}</span>
                                        <ul className={styles.list_about_item}>
                                            <li><span>цена: </span>{el.price}</li>
                                            <li className={styles.count}>
                                                <span>кол: </span>{el.count}
                                            </li>
                                            <li><span>итог: </span>{el.price * el.count}</li>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                            :
                            <h1>Заказ принят! Ожидайте с вами свяжутся</h1>
                    }
                </div>
            </div>
        </div>
    );
};


export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(getInfoStore())
    await store.dispatch(getWords())

});

export default Order;