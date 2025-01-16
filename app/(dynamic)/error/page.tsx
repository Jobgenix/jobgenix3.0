'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';

const ErrorPage: React.FC = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error') || "Default";

    const errorMessages: { [key: string]: string } = {
        Configuration: "There seems to be a configuration issue. Please contact support.",
        AccessDenied: "Access Denied! You don't have permission to access this resource.",
        Verification: "The verification link is invalid or has expired. Please try again.",
        OAuthAccountNotLinked: "This account is not linked to your profile. Please sign in with the provider you used to create your account or link this provider in your account settings.",
        Default: "An unknown error occurred. Please try again later.",
      };
    
      const message = errorMessages[error] || errorMessages.Default;

    return (
        <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="text-[#FF6B6B] text-6xl mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                We couldn&apos;t process your request.
            </h2>
            <p className="text-gray-600">
                {message}
            </p>
        </div>
    );
};

export default ErrorPage;
