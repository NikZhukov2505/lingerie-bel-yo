import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getCategories, getProducts, getWords } from './../redux/reducers/lingerie-reducer';
import { wrapper } from './../redux/index';
import ListProducts from '../Components/ListProducts';
import { getInfoStore } from './../redux/reducers/info-reducer';
import Products from '../Components/Products';
import { useSelector } from 'react-redux';
import Paginator from '../Components/Pagination';
import { useState } from 'react';


const Home = () => {
  const { products, categoryList } = useSelector(state => state?.lingerie)
  const { info } = useSelector(state => state?.info)
  const [currentPage, setCurrentPage] = useState(1)


  const categoryKeywords = categoryList.map(el => {
    return el.name
  })
  const ck1 = categoryKeywords.join(", ")
  const ck2 = categoryKeywords.join(" бишкек, ")
  const ck3 = categoryKeywords.join(" купить, ")
  const keywords = `Женское нижнее белье, женское белье Бишкек, женское корсетное бельё, домашняя одежда Бишкек, пляжное белье Бишкек, купить нижнее белье бишкек, комплект бюстгалтеров Бишкек, пушап, ${ck1} ${ck2} ${ck3} `

  return (
    <main className={styles.main_wrapper}>
      <Head>
        <title>Главная</title>
        <meta name="google-site-verification" content="trzVTTTMInqhRQZlIALdrrsLePdtvbrQ8aRB5n8_mY4" />
        <meta name="yandex-verification" content="f78ce189926a5a5d" />
        <link rel="icon" type='image/png' href={info?.logo ? `http://195.38.164.87:8000${info?.logo}` : ''} />
        <meta name='author' content={info.company_name} />
        <meta name='description' content={'Женское нижнее белье, женское белье Бишкек, женское корсетное бельё, домашняя одежда Бишкек, пляжное белье Бишкек, купить нижнее белье бишкек, комплект бюстгалтеров Бишкек, пушап Итальянское женское нижнее белье в Бишкеке,'} />
        <meta name='keywods' content={keywords} />
        <meta property="og:image" content={info?.logo ? `http://195.38.164.87:8000${info?.logo}` : ''} />
        <meta property="og:description" content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье Купить в Бишкеке'} />
        <meta property="og:title" content={info?.company_name} />
        <meta property='og:url' content='http://www.underwearitaly.com/' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='underwearitaly.com - Интернет магазин женского нижнего бельья' />
      </Head>
      <ListProducts setCurrentPage={setCurrentPage} list={categoryList} />
      <Products products={products.results} />
      <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(getProducts())
  await store.dispatch(getInfoStore())
  await store.dispatch(getCategories())
  await store.dispatch(getWords())
});


export default Home
