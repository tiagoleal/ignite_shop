import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";

export async function POST(request: Request) {
  const data = await request.json();
  const { priceId } = data;

  console.log("priceId" + data);

  if (!priceId) {
    return NextResponse.json({ error: "Price not found" }, { status: 400 });
  }

  // const priceId = "price_1P1tAfCQH3lrDhTXYNecGV2h";
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return NextResponse.json(
    { checkoutUrl: checkoutSession.url },
    { status: 201 }
  );
}
