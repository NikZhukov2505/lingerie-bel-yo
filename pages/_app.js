import { Provider } from 'react-redux'
import Layout from '../Components/Layout'
import { wrapper } from '../redux'
import '../styles/globals.css'

function MyApp({ Component, ...rest }) {

  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
