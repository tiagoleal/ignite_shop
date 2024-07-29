import { NextResponse } from "next/server"

export async function POST(request: Request, context: any) {
  const { params } = context;
  
  const userData = [
    {
      id: 1,
      name: "tiago",
      age: 35,
    },
    {
      id: 2,
      name: "luana",
      age: 35,
    },
  ];

  const user = userData.filter(x => params.userId === x.id.toString());

  return NextResponse.json({
    user,
  })
}