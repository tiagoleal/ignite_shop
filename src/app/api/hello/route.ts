import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello world" }, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();  
  return NextResponse.json({ data }, { status: 200 });
}