"use client"
import axios from "axios";
import { useState } from "react";

export function CheckoutButton({ price }: any) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

   async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: price,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }
      
  return (
    <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>
        Comprar agora
    </button>
  )
};