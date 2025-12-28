// src/core/cache/utils/env.ts
var isDev = () => {
  if (import.meta.env?.MODE) {
    return import.meta.env?.MODE === "development";
  }
  if (process?.env?.NODE_ENV) {
    return process.env?.NODE_ENV === "development";
  }
  return false;
};
var isProduction = () => !isDev();

export {
  isDev,
  isProduction
};
