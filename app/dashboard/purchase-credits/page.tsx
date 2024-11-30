"use client"
import { UserDataContext } from '@/app/_context/UserDataContext';
import { Button } from '@/components/ui/button';
import { db } from '@/config';
import { Users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';
import React, { useState, useContext } from 'react';
import { UserDetailType } from '@/types';
import { eq } from 'drizzle-orm';

function PurchaseCredits() {

    const options = [
        {
            price: 4.99,
            credits: 10     // $0.5 per credit
        },
        {
            price: 9.99,
            credits: 25   // ~$0.40 per credit
        },
        {
            price: 19.99,
            credits: 60    // ~$0.33 per credit
        },
        {
            price: 29.99,
            credits: 100    // ~$0.3 per credit
        },
    ];

    const [selectedPrice, setSelectedPrice] = useState<{ price: number; credits: number } | null>(null);
    const {userDetail,setUserDetail}=useContext(UserDataContext);
      const router=useRouter();
      const onPaymentSuccess = async () => {
        if (!userDetail || !selectedPrice) return;
    
        try {
            const result = await db.update(Users)
                .set({
                    credits: (userDetail.credits || 0) + selectedPrice.credits
                })
                .where(eq(Users.id, userDetail.id))
                .returning();
    
                if (result) {
                    // Create a properly typed update with all required properties explicitly
                    const updatedUser: UserDetailType = {
                        id: userDetail.id,
                        name: userDetail.name,
                        email: userDetail.email,
                        imageUrl: userDetail.imageUrl,
                        createdAt: userDetail.createdAt,
                        credits: (userDetail.credits || 0) + selectedPrice.credits
                    };
                    
                    setUserDetail(updatedUser);
                    router.push('/dashboard');
                }
        } catch (error) {
            console.error('Error updating credits:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="text-center pt-28">
                    <h2 className="text-6xl font-bold text-colors-custom-purple">Purchase Credits</h2>
                    <h2 className="text-xl text-colors-custom-purple pt-4">Never run out of inspiration, or.....Credits</h2>
                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10'>
            {options.map((item,index)=>(
              <div 
                key={index}
                className={`flex flex-col gap-2 justify-center items-center border shadow-md rounded-lg p-5
                ${selectedPrice?.credits===item.credits ? 'border-primary' : ''}
                `}
              >
                <h2 className='font-bold text-3xl'>{item.credits}</h2>
                <h2 className='font-medium text-xl'>Credits</h2>

                <Button className="w-full bg-colors-custom-purple" onClick={() => setSelectedPrice(item)}>$ {item.price}</Button>
                <h2 className='font-medium text-primary'>${item.price}</h2>
              </div>
            ))}
        </div>
       

        <div className='mt-20'>
            {selectedPrice?.price && (
               <PayPalButtons
               style={{ layout: "horizontal" }}
               onApprove={async () => {
                   try {
                       await onPaymentSuccess();
                   } catch (error) {
                       console.error('Payment processing failed:', error);
                       // You might want to add a toast notification here
                   }
               }}
               onError={(err) => {
                   console.error('PayPal Error:', err);
                   // You might want to add a toast notification here
               }}
               onCancel={() => console.log("Payment cancelled by user")}
               createOrder={(data, actions) => {
                   if (!selectedPrice?.price) {
                       throw new Error('No price selected');
                   }
                   return actions.order.create({
                       intent: "CAPTURE",
                       purchase_units: [
                           {
                               amount: {
                                   value: selectedPrice.price.toFixed(2),
                                   currency_code: "USD",
                               },
                           },
                       ],
                   });
               }}
           />
            )}
        </div>



        </div>
        
    )
}

export default PurchaseCredits