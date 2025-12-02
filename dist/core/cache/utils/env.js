export const isDev = () => {
    if (typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'development') {
        return true;
    }
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
        return true;
    }
    return false;
};
export const isProduction = () => !isDev();
//# sourceMappingURL=env.js.map