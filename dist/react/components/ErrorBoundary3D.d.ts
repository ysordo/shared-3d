import type { ReactNode } from 'react';
import React, { Component } from 'react';
type Props = {
    children: ReactNode;
    fallback?: ReactNode;
};
type State = {
    hasError: boolean;
};
export declare class ErrorBoundary3D extends Component<Props, State> {
    state: {
        hasError: boolean;
    };
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: any): void;
    render(): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export {};
//# sourceMappingURL=ErrorBoundary3D.d.ts.map