import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { Component, ReactNode } from 'react';

type Props = {
    children: ReactNode;
    fallback?: ReactNode;
};
type State = {
    hasError: boolean;
};
declare class ErrorBoundary3D extends Component<Props, State> {
    state: {
        hasError: boolean;
    };
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: any): void;
    render(): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | react_jsx_runtime.JSX.Element | null | undefined;
}

export { ErrorBoundary3D };
