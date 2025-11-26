'use client';
import { useCache as useCacheContext } from '../context/CacheContext';

export const useCache = () => {
  return useCacheContext();
};