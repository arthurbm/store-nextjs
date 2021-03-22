import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react'
import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {

  return (
    <>      
      <section>
        <Title>Products</Title>
      </section>

      <ul>
        {recommendedProducts.map(recommendedProduct => {
          return (
            <li key={recommendedProduct.id} >
              {recommendedProduct.title}
            </li>
          )
        })}
      </ul>
    </>
  )
}


export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await res.json();

    return {
      props: {
        recommendedProducts,
      }
    }
}