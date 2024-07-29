"use client"

import Image from "next/image"
import { HomeContainer, Product } from "../styles/app/home"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link';

interface productProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export  function HomeComponent({ products }: productProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48
    }
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product,index) => {
        return (
          <Product key={product.id} className={`keen-slider__slide number-slide${index}`}>
            <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
            </Link>
          </Product>
        )
      })}
    </HomeContainer>
  )
}