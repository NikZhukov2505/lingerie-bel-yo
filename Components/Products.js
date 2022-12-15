import Image from 'next/image';
import React from 'react';
import styles from '../styles/Product.module.css'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import 'animate.css'
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Products = () => {
    const products = useSelector(state => state?.lingerie?.products?.results)
    return (
        <div id='top_test' className={styles.container}>
            {products?.length > 0 ? products.map(p => (
                <AnimationOnScroll className={styles.product_card} key={p.id} animateIn="animate__flipInY">
                    <Link href={`/product/${p.id}`}>
                        {p?.image ? <Image
                            className={styles.card_img}
                            src={p.image}
                            width={200}
                            height={300}
                            alt={p.image}
                            layout='responsive'
                            unoptimized={true}
                            priority
                        /> : null}
                    </Link>
                    <div className={p.is_new || p.discount ? styles.new_or_discount : null}>
                        <span>{p.is_new ? 'NEW ' : null}</span>
                        <span>{p.discount > 0 ? ` ${p.discount}%` : null}</span>
                    </div>
                    <h4>{p.name}</h4>
                    <div className={styles.price_block}>
                        <div className={styles.price}>
                            <p className={styles.total}>{Math.ceil(p.total_price)}с</p>
                            <p className={styles.discount}>{p.discount > 0 ? p.price : null}</p>
                        </div>
                    </div>
                </AnimationOnScroll>
            ))
                :
                <h1 className={styles.none}>Товар не найден!</h1>
            }

        </div>
    );
};

export default Products;