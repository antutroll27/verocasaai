'use client'
import React, { useState } from "react"


function PurchaseCredits() {

    const options = [
        {
            price: 4.99,
            credits: 10,     // $0.5 per credit
        },
        {
            price: 9.99,
            credits: 25,    // ~$0.40 per credit
        },
        {
            price: 19.99,
            credits: 60,    // ~$0.33 per credit
        },
        {
            price: 29.99,
            credits: 100,    // ~$0.3 per credit
        },
    ];

    const [selectedPrice,setSelectedOption]=useState([]);

    return (
        <div>
            <div className="flex justify-center">
                <div className="text-center pt-28">
                    <h2 className="text-6xl font-bold text-colors-custom-purple">Purchase Credits</h2>
                    <h2 className="text-2xl text-colors-custom-purple pt-4">Never run out of inspiration, or.....Credits</h2>
                </div>
            </div>
        </div>
    )
}

export default PurchaseCredits