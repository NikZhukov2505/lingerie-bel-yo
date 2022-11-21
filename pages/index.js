import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getCategories, getProducts, getWords } from './../redux/reducers/lingerie-reducer';
import { wrapper } from './../redux/index';
import ListProducts from '../Components/ListProducts';
import { getInfoStore } from './../redux/reducers/info-reducer';
import Products from '../Components/Products';
import { useSelector } from 'react-redux';
import Paginator from '../Components/Pagination';


const Home = () => {
  const { products, categoryList, keyWords } = useSelector(state => state?.lingerie)
  const { info } = useSelector(state => state?.info)
  return (
    <main className={styles.main_wrapper}>
      <Head>
        <title>Главная</title>
        <link rel="icon" type='image/png' href={`http://195.38.164.87:8000${info?.logo}`} />
        <meta name='author' content={info.company_name} />
        <meta name='description' content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье' + keyWords.join(' ') + ' Купить в Бишкеке'} />
        <meta name='keywods' content={keyWords.join(' ')} />
        <meta property="og:image" content={`http://195.38.164.87:8000${info?.logo}`} />
        <meta property="og:description" content={'Итальянское женское нижнее белье в Бишкеке, самые лучшие цены , французское белье, испанское белье' + keyWords.join(' ') + ' Купить в Бишкеке'} />
        <meta property="og:title" content={info.company_name} />
        <meta property='og:url' content='http://www.underwearitaly.com/' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='underwearitaly.com - Интернет магазин женского нижнего бельья' />
      </Head>
      <ListProducts list={categoryList} />
      <Products products={products.results} />
      <Paginator />
    </main>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(getProducts())
  await store.dispatch(getInfoStore())
  await store.dispatch(getCategories())
  await store.dispatch(getWords())
  const state = store.getState()

  return {
    props: {
      products: state.lingerie.products,
      list: state.lingerie.categoryList,
    }
  }
});


export default Home
