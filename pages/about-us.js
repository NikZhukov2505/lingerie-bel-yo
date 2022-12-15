import React from 'react';
import { wrapper } from './../redux/index';
import { getInfoStore } from './../redux/reducers/info-reducer';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { getWords } from './../redux/reducers/lingerie-reducer';
import styles from '../styles/About.module.css'

const AboutUs = () => {
    const { info } = useSelector(state => state.info)
    return (
        <div className={styles.about_wrapper}>
            <Head>
                <title>О нас</title>
                <link rel="icon" type='image/png' href={`http://195.38.164.87:8000${info?.logo}`} />
                <meta name='author' content={info.company_name} />
                <meta name='description' content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье Купить в Бишкеке'} />
                <meta property="og:image" content={`http://195.38.164.87:8000${info?.logo}`} />
                <meta property="og:description" content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье Купить в Бишкеке'} />
                <meta property="og:title" content={info.company_name} />
                <meta property='og:url' content='http://www.underwearitaly.com/about-us/' />
                <meta property='og:type' content='website' />
                <meta property='og:site_name' content='underwearitaly.com - Интернет магазин женского нижнего бельья' />
            </Head>
            <div className={styles.container}>
                <h1>{info.company_name}</h1>
                <p className={styles.company}><span>Компания «{info.company_name}»</span> существует на рынке более 8 лет
                    . Ассортимент включает в себя продукцию
                    более 60 крупнейших производителей из Франции, Италии, Польши,
                    Латвии, Южной Кореи, Испании и России следующих товарных групп:
                </p>
                <div className={styles.mark_list}>
                    <ul>
                        <li>Женское корсетное белье</li>
                        <li>Поясная группа (женское и мужское нижнее белье)</li>
                        <li>Предпостельное белье</li>
                        <li>Домашняя одежда</li>
                    </ul>
                    <ul>
                        <li>Чулочно-носочные изделия</li>
                        <li>Утягивающее белье</li>
                        <li>Эротическое белье</li>
                        <li>Пляжное белье</li>
                        <li>Аксессуары</li>
                    </ul>
                </div>
                <p className={styles.company}>Наша компания также является эксклюзивным представителем на территории России торговых марок MIOOCCHI (Италия) и AMELIE (Франция), а также дистрибьютором следующих торговых марок:</p>
                <ul className={styles.company_names}>
                    <li>Cotonella, Dimanche, Infiore, Jolidon, Leilieve, Lormar, Opium, Primaverina, Rosa Selvatica, Sielei, Sollievo by Lormar, Cotonella, Lovely Girl, Minimi, Omsa, Opium, Sergio Dallini, SiSi (Италия);</li>
                    <li>Alles, AVA, Julimex, Nipplex (Польша);</li>
                    <li>Eodry, Lolita (Южная Корея);</li>
                    <li>Conte Elegante, Conte Lingerie, Milady, Amoret (Белоруссия);</li>
                    <li>V.O.V.A, Albina L, Fluide (Латвия);</li>
                    <li>Janira, Dentelle, Tuosite (Испания);</li>
                    <li>Belweiss, Tribuna, Valeria Lingerie, MY, Almando Melado, Lengy (Россия);</li>
                </ul>
            </div>

        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(getInfoStore())
    await store.dispatch(getWords())
    const state = store.getState()
    return {
        props: {
            info: state.info.info
        }
    }
});

export default AboutUs;