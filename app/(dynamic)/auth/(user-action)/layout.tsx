'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is authenticated, redirect them to the /home page
    if (session.status === 'authenticated') {
      router.push('/home');
    }
  }, [session, router]);

  // Render the children only if the user is not authenticated
  return <>{children}</>;
};

export default AuthLayout;
