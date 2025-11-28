/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { ReactNode } from 'react';
import React, { Component } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary3D extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error 3D capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="text-red-500">Error al cargar modelo 3D</div>
        )
      );
    }
    return this.props.children;
  }
}
