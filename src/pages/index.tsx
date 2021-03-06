import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stipe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head> 

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋️ Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}




////////////// SSG //////////////////////////////////////////
/**
 * 1. Essa funcão é executada do lado do servidor gerando um html
 * estatico, que evita a geração do bundle em toda requisição de pagina
 * 2. Podemos utilizar o 'revalidate' pra informar em quanto tempo 
 * desejamos que seja gerado outro bundle da página
 */
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JFQszLgMbxXQyqO1r9taEds')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 horas
  }
}

////////////// SSR //////////////////////////////////////////
// /**
//  * 1. Essa funcão é executada do lado do servidor
//  * 2. Tudo que eu retornar aqui eu consigo acessar nas propriedades da pagina
//  */
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve('price_1JFQszLgMbxXQyqO1r9taEds')

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(price.unit_amount / 100)
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }