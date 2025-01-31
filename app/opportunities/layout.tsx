'use client';
import { Suspense } from 'react';

const JobDisplayLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <Suspense>
            {children}
        </Suspense>
    )
}

export default JobDisplayLayout