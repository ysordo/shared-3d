export const isDev = (): boolean => {
  if (import.meta.env?.MODE) {
    return import.meta.env?.MODE === 'development';
  }

  if (process?.env?.NODE_ENV) {
    return process.env?.NODE_ENV === 'development';
  }

  return false;
};

export const isProduction = (): boolean => !isDev();