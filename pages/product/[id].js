import React from 'react';
import { allAPIs } from '../../axios';
import { wrapper } from './../../redux/index';
import { getProductById, getRandomProducts, getWords } from './../../redux/reducers/lingerie-reducer';
import { useSelector } from 'react-redux';
import { getInfoStore } from './../../redux/reducers/info-reducer';
import Head from 'next/head';
import styles from '../../styles/Detail.module.css'
import InfoDetail from '../../Components/InfoDetail';
import Random from './../../Components/Random';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';



export const getStaticPaths = async () => {
    const data = await allAPIs.getProductsByPaths()
    const paths = data.map(el => {
        return {
            params: { id: el.id + '' }
        }
    })
    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
    const id = context.params.id
    await store.dispatch(getProductById(id))
    await store.dispatch(getInfoStore())
    await store.dispatch(getRandomProducts())
    await store.dispatch(getWords())

    return {
        props: { id: id },
        revalidate: 3
    }

})

const Product = () => {
    const { product, random } = useSelector(state => state?.lingerie)
    const { info } = useSelector(state => state.info)
    const router = useRouter()

    if (router.isFallback) {
        return <div className={styles.loading_wrapper}>
            <div className={styles.spinner}>
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
        </div>
    }


    const keywordsString = product?.description?.split(" ").join(", ")

    return (
        <div className={styles.id_wrapper}>
            <Head>
                <title>{product.name}</title>
                <link rel="icon" type='image/png' href={`http://195.38.164.87:8000${info?.logo}`} />
                <meta name='author' content={info.company_name} />
                <meta name='description' content={product.name + ": " + product.description + ' Купить в Бишкеке'} />
                <meta name='keywods' content={keywordsString} />
                <meta property="og:image" content={`http://195.38.164.87:8000${info?.logo}`} />
                <meta property="og:description" content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье' + product.description + ' Купить в Бишкеке'} />
                <meta property="og:title" content={info.company_name} />
                <meta property='og:type' content='website' />
                <meta property='og:url' content={`http://www.underwearitaly.com/product/${product.id}`} />
                <meta property='og:site_name' content='underwearitaly.com - Интернет магазин женского нижнего бельья' />
            </Head>

            <InfoDetail product={product} />
            <h2 className={styles.see_more}>Смотреть еще</h2>
            <Random random={random} />
            <div onClick={() => window.scrollTo(0, 0)} className={styles.arrow_up}>
                <span>Вверх</span>
                <Image
                    src={'/arrow_close.png'}
                    width={30}
                    height={30}
                    alt={'up'}
                />
            </div>
        </div>
    );
};

export default Product;