import { useEffect, useState } from 'react'
import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

export default function Client() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    // Também é possível usar o axios ou SWR (Criado pelo Next, facilita client side fetching)
    fetch('http://localhost:3333/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data);
      })
    })
  }, [])

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
