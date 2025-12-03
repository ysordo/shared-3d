// src/core/cache/utils/env.ts
var isDev = () => {
  if (typeof import.meta !== "undefined" && import.meta.env?.MODE === "development") {
    return true;
  }
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
    return true;
  }
  return false;
};
var isProduction = () => !isDev();

export {
  isDev,
  isProduction
};
