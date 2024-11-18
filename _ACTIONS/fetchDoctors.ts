'use server'


import prismaClient from "@/lib/db";


export default async function fetchDoctors() {
  try {
   
    const user=await prismaClient.user.findMany(
        {
            where: { role:"doctor" },
            orderBy:{
                createdAt:"desc"
            }
        }
    )
    if (!user) {
        return {
          data: null,
          message: 'No doctors available',
          subMessage: 'Please try again later',
          status: 400,
        };
      }
    
   const doctors= user.map((user)=>({
        id:user.id,title:`Dr.${user.firstName}- ${user.specialization}`,email:user.email,specialization:user.specialization
      }))

   
    return {
      data: doctors,
      message: '',
      subMessage: '',
      status: 200,
    };

  } catch (error) {
    console.log(error);
    return {
      message: 'Internal Server Error',
      subMessage: 'Please try again later',
      status: 500,
    };
  }
}
