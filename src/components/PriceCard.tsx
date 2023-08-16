import React from 'react';

type PriceCardProps = {
  text: string;
  price: number;
};

export default function PriceCard({ text, price }: PriceCardProps) {
  return (
    <div className='p-8 mx-2 text-lg text-center bg-gray-50 rounded-2xl md:text-xl'>
      <p>{text}</p>
      <p className='text-xl font-bold text-brand md:text-2xl'>₩{price}</p>
    </div>
  );
}
