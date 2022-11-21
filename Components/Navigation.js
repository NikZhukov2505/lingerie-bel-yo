import React from 'react';
import styles from '../styles/Header.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = () => {

    const router = useRouter()

    return (
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
                <li>
                    <Link className={router.pathname == '/contacts' ? `${styles.menu__item} ${styles.active}` : styles.menu__item}
                        href={'/contacts/'}>Контакты</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;