'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from "react";

const ErrorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[#2F8E5B]">Oops!</h1>
        <p className="text-gray-600">Something went wrong.</p>
      </header>
      <main className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <Suspense>
          {children}
        </Suspense>
      </main>
      <footer className="mt-8">
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-[#2F8E5B] text-white font-bold rounded-lg hover:bg-[#329761] transition"
        >
          Go to Homepage
        </button>
      </footer>
    </div>
  );
};

export default ErrorLayout;
