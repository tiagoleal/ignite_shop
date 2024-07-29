import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../../styles/app/product"
import { Suspense } from "react";
import { CheckoutButton }  from './checkoutButton';
import type { Metadata } from "next";

export async function generateMetadata({ params }: any) {
  return {
    title: `${params.id}`
  }
  
};

interface ParamsProps {
  params: {
    id: string
  }
}

const ProductPage = async ({ params: { id } }: ParamsProps) => {

  const productData = await stripe.products.retrieve(id, {
    expand: ['default_price']
  });

  const price = productData.default_price as Stripe.Price;
  
  const product = {
    id: productData.id,
    name: productData.name,
    imageUrl: productData.images[0],
    price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price.unit_amount / 100),
    description: productData.description,
    defaultPriceId: price.id,
  };
      
  return (
    <ProductContainer>
      <Suspense fallback={<p>Carregando produtos...</p>}>
        <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>

            <p>{product.description}</p>

            <CheckoutButton price={product.defaultPriceId}/>
        </ProductDetails>
      </Suspense>
    </ProductContainer>
  )
}


export default ProductPage;