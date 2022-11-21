import React from 'react';
import styles from '../styles/Footer.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Footer = () => {
    const { info } = useSelector(state => state.info)
    const router = useRouter()
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_container}>
                <div className={styles.footer_top_block}>
                    <nav className={styles.nav}>
                        <ul className={styles.menu}>
                            <li>
                                <Link className={router.pathname == '/' ? `${styles.menu__item} ${styles.active}` : styles.menu__item}
                                    href={'/'}>Лента</Link>
                            </li>
                            <li>
                                <Link className={router.pathname == '/about-us' ? `${styles.menu__item} ${styles.active}` : styles.menu__item}
                                    href={'/about-us/'}>О нас</Link>
                            </li>
                            <li className={styles.contacts_link}>
                                <Link className={router.pathname == '/contacts' ? `${styles.menu__item} ${styles.active}` : styles.menu__item}
                                    href={'/contacts/'}>Контакты</Link>
                            </li>
                        </ul>
                    </nav>
                    <p>{info.address}</p>
                </div>
                <div className={styles.footer_bottom_block}>
                    <div className={styles.footer_logo}>
                        <h2>{info.company_name}</h2>
                        <p>	&#169; 2014-{new Date().getFullYear()}</p>
                    </div>
                    <div className={styles.social_media}>
                        <Link href={info.instagram_link || ''}>
                            <Image
                                src={'/insta.png'}
                                alt='instagram'
                                width={30}
                                height={30}
                                layout='responsive'
                                priority
                            />
                        </Link>
                        <Link href={info.telegram_link || ''}>
                            <Image
                                src={'/telegram.png'}
                                alt='telegram'
                                width={30}
                                height={30}
                                layout='responsive'
                            />
                        </Link>
                        <Link href={info.whatsapp_link || ''}>
                            <Image
                                src={'/whats_app.png'}
                                alt='whats_app'
                                width={30}
                                height={30}
                                layout='responsive'
                            />
                        </Link>

                    </div>
                    <div className={styles.footer_phones}>
                        <p><a href={`tel:${info?.phone_number}`}>{info?.phone_number}</a></p>
                    </div>

                </div>
            </div>
        </footer>
    );
};



export default Footer;