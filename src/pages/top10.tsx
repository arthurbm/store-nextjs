import { GetStaticProps } from "next"

interface IProduct {
    id: string;
    title: string;
}

interface Top10Props {
    products: IProduct[];
}


export default function Top10({ products }: Top10Props) {
    return (
        <>
            <h1>Top 10</h1>

            <ul>
                {products.map(product => {
                return (
                    <li key={product.id} >
                    {product.title}
                    </li>
                )
                })}
      </ul>
        </>
    )
}

// Em ambiente de desenvolvimento ele roda toda vez que você entra na página, mas em produção é só na build
export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
    const res = await fetch('http://localhost:3333/products');
    const products = await res.json();

    return {
        props: {
            products,
        },
        revalidate: 30,
    }
}