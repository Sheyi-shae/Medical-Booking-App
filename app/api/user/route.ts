import prismaClient from '@/lib/db';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {
  try {
    const {password, email,lastName} = await req.json(); 
    
    

    

    
  } catch (error) {
    console.error('Error in POST API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request:NextRequest){
  try {
      const user=await prismaClient.user.findMany(
          {
              orderBy:{
                  createdAt:"desc"
              }
          }
      )
      return NextResponse.json(user);
  } catch (error) {
      console.error("Error:", error);
      // Return an error response with status code 500
      return NextResponse.json({ status: 500 });
  }

}