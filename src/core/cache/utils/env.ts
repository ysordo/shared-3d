export const isDev = (): boolean => {
  // Vite
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.MODE === 'development') {
    return true;
  }

  // Webpack / Node.js / CRA / Next.js
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    return true;
  }

  return false;
};

export const isProduction = (): boolean => !isDev();