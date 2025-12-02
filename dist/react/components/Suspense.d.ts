import type { ReactNode } from 'react';
import React from 'react';
type SuspenseProps = {
    children: ReactNode;
    fallback?: ReactNode | undefined;
    loadingMessage?: string;
};
export declare const Suspense: React.FC<SuspenseProps>;
export {};
//# sourceMappingURL=Suspense.d.ts.map