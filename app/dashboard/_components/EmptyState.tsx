import React from 'react';
import Spline from '@splinetool/react-spline';
import { Button } from '@/components/ui/button';

function EmptyState() {
 

  return (
    <div className="flex justify-center items-center ">
      <div className="w-[80vw] h-[1000px] mt-[-80vh] relative " style={{ left: '15vw' }}> {/* Keep the wrapper dimensions as is */}
        <Spline
          scene="https://prod.spline.design/jdwqrkdjY03dP0aL/scene.splinecode"
          
          style={{
            width: '100%',
            height: '100%',
            transform: 'scale(0.8)', // Scale down the component
            transformOrigin: 'right',
             // Adjust origin if you want it to stay centered
          }}
        />
    </div>
    
    </div>
  );
}

export default EmptyState;
