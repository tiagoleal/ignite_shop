import Image from "next/image"
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, SuccessContainer } from "../../styles/app/success";
import { redirect } from 'next/navigation'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Compra efetuada`
};


interface SearchProps {
  searchParams: {
    session_id: string
  }
}

const SuccessPage = async ({ searchParams: {session_id} }: SearchProps) =>{
  
  if (!session_id) {
    redirect('/')
  }

  const sessionId = String(session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  console.log("session:" + JSON.stringify(session));

  const costumerName = session.customer_details.name;
  const productData = session.line_items.data[0].price.product as Stripe.Product;

  const response = {
    costumerName,
    product: {
      name: productData.name,
      imageUrl: productData.images[0]
    }
  };

  return (

    <SuccessContainer>
      <h1>Compra efetuada</h1>

      <ImageContainer>
        <Image src={response.product.imageUrl} width={120} height={110} alt="" />
      </ImageContainer>

      <p>
        Uhuul <strong>{response.costumerName}</strong>, sua <strong>{response.product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
    
  )
}

export default SuccessPage;