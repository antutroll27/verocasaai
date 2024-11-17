import React from 'react'
import { Label } from '@radix-ui/react-select'
import { Textarea } from "@/components/ui/textarea"

interface PromptAreaProps {
  customPrompt: (value: string) => void;
}

function PromptArea({ customPrompt }: PromptAreaProps) {
  return (
    <div className="grid w-full gap-1.5 mt-6 mb-4">
      <h3 className=' pl-4 font-semibold text-white bg-colors-custom-pink rounded-md w-21 mb-2'>3. Additional Custom Prompt</h3>
      <Textarea placeholder="Write your Custom prompt here (Not Mandatory)." id="message" 
      className='bg-neutral-100 h-32'
      onChange={(e)=>customPrompt(e.target.value)}/>
    </div>
  )
}

export default PromptArea
