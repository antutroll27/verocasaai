import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      {/* Title section */}
      <div className="text-center mb-6 mt-20">
        <h1 className="text-8xl font-bold mb-5">
          <span className="text-colors-custom-pink">Empty ?</span>
          <span className="text-colors-custom-purple"> Perfect. Let's Design something memorable :) </span>
        </h1>
      </div>
      
      {/* Call to action section - Text and button together */}
      <div className="text-center flex flex-col items-center gap-4">
        <h3 className="text-2xl text-colors-custom-purple mb-5">Start by redesigning a room with our AI tools.</h3>
        
        <Link href={"/dashboard/ai-redesign"}>
          <Button className="rounded-none bg-colors-custom-purple hover:bg-colors-custom-purple/70 transition-all duration-200 flex items-center gap-2 py-3 px-6 text-sm">
            <span className="tracking-[0.1em]">RE-DESIGN ROOM WITH AI</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EmptyState;
