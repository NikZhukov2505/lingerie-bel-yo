import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { wrapper } from '../redux';
import styles from '../styles/Contacts.module.css'
import { getInfoStore } from './../redux/reducers/info-reducer';
import Head from 'next/head';
import { getWords } from './../redux/reducers/lingerie-reducer';
import { useSelector } from 'react-redux';


const Contacts = ({ info }) => {
    const { keyWords } = useSelector(state => state.lingerie)

    return (
        <div className={styles.contacts_wrapper}>
            <Head>
                <title>Контакты</title>
                <link rel="icon" type='image/png' href={`http://195.38.164.87:8000${info?.logo}`} />
                <meta name='author' content={info.company_name} />
                <meta name='description' content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье' + keyWords.join(' ') + ' Купить в Бишкеке'} />
                <meta name='keywods' content={keyWords.join(' ')} />
                <meta property="og:image" content={`http://195.38.164.87:8000${info?.logo}`} />
                <meta property="og:description" content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье' + keyWords.join(' ') + ' Купить в Бишкеке'} />
                <meta property="og:title" content={info.company_name} />
                <meta property='og:url' content='http://www.underwearitaly.com/contacts/' />
                <meta property='og:type' content='website' />
                <meta property='og:site_name' content='underwearitaly.com - Интернет магазин женского нижнего бельья' />
            </Head>
            <div className={styles.contacts_info}>
                <h1 className={styles.company_name}>{info.company_name}</h1>
                <h2>{info.address}</h2>
                <h2>{info.description}</h2>
                <div className={styles.social_block}>
                    <Link href={info.instagram_link || ''}>
                        <Image
                            src={'/insta_black.png'}
                            alt='instagram'
                            width={30}
                            height={30}
                            layout='responsive'
                            priority
                        />
                    </Link>
                    <Link href={info.telegram_link || ''}>
                        <Image
                            src={'/telega_black.png'}
                            alt='telegram'
                            width={30}
                            height={30}
                            layout='responsive'
                        />
                    </Link>
                    <Link href={info.whatsapp_link || ''}>
                        <Image
                            src={'/wa_black.png'}
                            alt='whats_app'
                            width={30}
                            height={30}
                            layout='responsive'
                        />
                    </Link>
                </div>
                <div className={styles.phones}>
                    <p className={styles.phone_text}>тел</p>
                    <p>{info.phone_number}</p>
                </div>
            </div>
            <div className={styles.map}>
                <img
                    src='/map2.png'
                    alt={'map'}
                    width={100}
                    height={100}
                />
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

export default Contacts;