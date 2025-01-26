import Image from 'next/image';
import React from 'react';

const ReferAndWin: React.FC = () => {
  return (
    <div className="bg-green-200 p-6 rounded-lg flex items-center justify-between">
      <div className="mr-6">
        <h2 className="text-2xl font-bold mb-2">Refer & Win</h2>
        <p className="text-gray-700">MacBook, iPhone, Apple Watch, AirPods, Cash Rewards and more!</p>
      </div>
      <div className="w-1/2 flex justify-end">
        <Image src="" alt="Refer and Win" className="max-h-32 object-contain" />
      </div>
      
      <a
        href="#"
        className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
      >
        Get Started
      </a>
    </div>
  );
};

export default ReferAndWin;