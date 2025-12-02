/* eslint-disable no-console */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import { CacheValidator } from '../core/cache/CacheValidator';
const CacheContext = createContext(null);
export const CacheProvider = ({ children }) => {
    const [status, setStatus] = useState('idle');
    const [progress, setProgress] = useState(0);
    const [report, setReport] = useState(null);
    const validate = async (manifest) => {
        setStatus('validating');
        setProgress(0);
        const result = await CacheValidator.validate({
            manifest,
            onProgress: (p, msg) => {
                setProgress(Math.round(p));
                console.info(`[Cache] ${msg} (${p}%)`);
            },
            onComplete: (r) => {
                setReport(r);
                setStatus(r.errors.length > 0 ? 'error' : 'ready');
            },
        });
        return result;
    };
    return (_jsx(CacheContext.Provider, { value: { status, progress, report, validate }, children: children }));
};
export const useCache = () => {
    const context = useContext(CacheContext);
    if (!context) {
        throw new Error('useCache debe usarse dentro de <CacheProvider>');
    }
    return context;
};
//# sourceMappingURL=CacheContext.js.map