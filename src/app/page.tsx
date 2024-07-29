import { HomeComponent } from './HomeComponent'

import { stripe } from "../lib/stripe";
import Stripe from "stripe";

export default async function Home() {

  console.log('server!')
  
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    const newPrice =  price && price.unit_amount ? (price.unit_amount / 100) : 0;

    return {
     id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(newPrice),
    }
  });

 return (
    <HomeComponent products={products} />
  )
}