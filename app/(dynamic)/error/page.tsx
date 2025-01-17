'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';
import { AUTH_ERROR_MESSAGES } from '@/constants/authErrorMessages';

const ErrorPage: React.FC = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error') || "Default";
    
      const message = AUTH_ERROR_MESSAGES[error] || AUTH_ERROR_MESSAGES.Default;

    return (
        <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="text-[#FF6B6B] text-6xl mb-4"
                height={50} width={50}
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
