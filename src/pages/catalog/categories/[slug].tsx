import { GetStaticPaths, GetStaticProps } from 'next';
import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';

interface IProduct {
    id: string;
    title: string;
}

interface CaregoryProps {
    products: IProduct[];
}

export default function Category() {
    const router = useRouter()

    return (
        <h1>{router.query.slug}</h1>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`http://localhost:3333/categories`);
    const categories = await res.json();

    const paths = categories.map((category) => {
        return {
            params: { slug: category.id }
        }
    })
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<CaregoryProps> = async (context) => {
    const { slug } = context.params;

    const res = await fetch(`http://localhost:3333/products?caregory_id=${slug}`);
    const products = await res.json();

    return {
        props: {
            products,
        },
        revalidate: 60,
    }
}