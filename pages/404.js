import React, { useEffect } from 'react';
import { wrapper } from '../redux';
import { getInfoStore } from './../redux/reducers/info-reducer';
import { useRouter } from 'next/router';
import styles from '../styles/Error.module.css'
import Image from 'next/image';
import Head from 'next/head';
import { getWords } from './../redux/reducers/lingerie-reducer';
import { useSelector } from 'react-redux';

const ErrorPage = () => {
    const { info } = useSelector(state => state.info)
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 3000)
    }, [])

    return (
        <div className={styles.error_wrapper}>
            <Head>
                <title>404</title>
                <link rel="icon" type='image/png' href={`http://195.38.164.87:8000${info?.logo}`} />
                <meta name='author' content={info.company_name} />
                <meta name='description' content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье Купить в Бишкеке'} />
                <meta property="og:image" content={`http://195.38.164.87:8000${info?.logo}`} />
                <meta property="og:description" content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье Купить в Бишкеке'} />
                <meta property="og:title" content={info.company_name} />
                <meta property='og:type' content='website' />
                <meta property='og:site_name' content='underwearitaly.com - Интернет магазин женского нижнего бельья' />
            </Head>
            <div className={styles.container}>
                <h1>Упс что-то пошло не так !!!</h1>
                <h2>Данная страница не найдена...</h2>
                <Image
                    src={'/smailik.png'}
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
};

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
    await store.dispatch(getInfoStore())
    await store.dispatch(getWords())
    const state = store.getState()

    return {
        props: {
            products: state.lingerie.products,
            list: state.lingerie.categoryList,
        }
    }
});

export default ErrorPage;