export const isDev = (): boolean => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.MODE === 'development') {
    return true;
  }

  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    return true;
  }

  return false;
};

export const isProduction = (): boolean => !isDev();