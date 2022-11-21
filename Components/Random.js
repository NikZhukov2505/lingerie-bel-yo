import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/Product.module.css'

const Random = ({ random }) => {
    return (
        <div className={styles.container}>
            {random?.length > 0 ? random.map(p => (
                <div className={styles.product_card} key={p.id}>
                    <Link href={`/product/${p.id}`} >
                        <Image
                            className={styles.card_img}
                            src={p.image}
                            width={200}
                            height={300}
                            alt={p.image}
                            layout='responsive'
                            unoptimized={true}
                            priority
                        />
                    </Link>
                    <div className={p.is_new || p.discount ? styles.new_or_discount : null}>
                        <span>{p.is_new ? 'NEW ' : null}</span>
                        <span>{p.discount > 0 ? ` ${p.discount}%` : null}</span>
                    </div>
                    <h2>{p.name}</h2>
                    <div className={styles.price_block}>
                        <div className={styles.price}>
                            <p className={styles.total}>{Math.ceil(p.total_price)}с</p>
                            <p className={styles.discount}>{p.discount > 0 ? p.price : null}</p>
                        </div>
                    </div>
                </div>
            ))
                :
                <h1>Товар не найден!</h1>
            }

        </div>
    );
};

export default Random;