import React, { ReactNode } from 'react';

type SuspenseProps = {
    children: ReactNode;
    fallback?: ReactNode | undefined;
    loadingMessage?: string;
};
declare const Suspense: React.FC<SuspenseProps>;

export { Suspense };
