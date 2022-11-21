import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../styles/Detail.module.css'
import { useDispatch } from 'react-redux';
import { setItems } from './../redux/reducers/lingerie-reducer';
import { useRouter } from 'next/router';

const InfoProduct = ({ product }) => {
    const router = useRouter()
    const [chooseSize, setChooseSize] = useState('')
    const [sizeId, setSizeId] = useState(null)
    const [chooseColor, setChooseColor] = useState('')
    const [colorName, setColorName] = useState('')
    const [colorId, setcolorId] = useState(null)
    const [count, setCount] = useState(1)
    const [showOrder, setShowOrder] = useState(false)
    const dispatch = useDispatch()

    const decrement = () => {
        setCount(count - 1)
    }
    const increment = () => {
        setCount(count + 1)
    }

    const addToBasket = (el) => {
        if (chooseColor == '') {
            alert('Выберите цвет!')
        } else if (chooseSize == '') {
            alert('Выберите размер!')
        } else {
            let all_products = JSON.parse(localStorage.getItem('lingeries')) || []

            const product = {
                id_item: all_products.length + 1,
                name: el.name,
                id: el.id,
                count,
                price: el.total_price,
                img: el.image,
                size: chooseSize,
                size_id: sizeId,
                color: chooseColor,
                color_name: colorName,
                color_id: colorId,
                producer: el.company_name,
                description: el.description,
                articul: el.articul,
                type_name: el.product_type_name,
            }

            let one_elem = all_products.find(elem => el.id == elem.id && chooseColor == elem.color && chooseSize == elem.size)
            if (one_elem) {
                one_elem.count = one_elem.count + count
            } else {
                all_products.push(product)
            }

            dispatch(setItems(all_products))
            localStorage.setItem('lingeries', JSON.stringify(all_products))
            addOrder()
        }
    }

    const addOrder = () => {
        setShowOrder(true)
        setCount(1)
        setChooseSize('')
        setChooseColor('')
        setTimeout(() => {
            setShowOrder(false)
        }, 4000)
    }

    return (
        <div className={styles.info_block}>
            <div className={styles.product_name}>
                <h1>{`${product?.product_type_name} ${product?.name}`}</h1>
                <p>{product?.description}</p>
            </div>
            <div className={styles.sizes_block}>
                {
                    product?.sizes?.map(s => (
                        <span
                            onClick={() => {
                                setChooseSize(s.size)
                                setSizeId(s.size_id)
                                setShowOrder(false)
                            }}
                            className={chooseSize == s.size ? `${styles.active_size} ${styles.size}` : styles.size}
                            key={s.size_id}
                        >{s.size}</span>
                    ))
                }
            </div>
            <div className={styles.colors_block}>
                {
                    product?.colors?.map(color => (
                        <span
                            onClick={() => {
                                setcolorId(color.color_id)
                                setChooseColor(color?.color_image)
                                setColorName(color.color_name)
                                setShowOrder(false)
                            }}
                            key={color.color_id}
                            className={chooseColor == color?.color_image ? `${styles.color_button_active} ${styles.color_button}` : styles.color_button}>
                            <Image width={30}
                                height={30}
                                src={color?.color_image}
                                loader={() => color?.color_image}
                                alt={color?.color_name}
                                title={color?.color_name}
                                unoptimized
                                priority />

                        </span>
                    ))
                }
            </div>
            <div className={styles.count_product}>
                <button disabled={count <= 1 ? true : false} onClick={decrement} className={styles.minus}>-</button>
                <span>{count}</span>
                <button onClick={increment} className={styles.plus}>+</button>
            </div>
            <div className={styles.company_code}>
                <h2>Производитель: {product?.company_name}</h2>
                <p>Код: {product?.articul}</p>
            </div>
            <div className={styles.buy_price}>
                <h2>{product?.total_price} Сом</h2>
                <button
                    onClick={() => {
                        addToBasket(product)
                    }}>Купить</button>
                {showOrder ? <h4 className={styles.add_order}>Товар отправлен в корзину</h4> : null}
            </div>
        </div>
    );
};

export default InfoProduct;