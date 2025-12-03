import React from 'react';

type DistanceUnit = 'm' | 'cm' | 'mm' | 'px' | 'in' | 'ft' | 'km';
type DistanceDisplayProps = {
    children: (data: {
        distance: number;
        formatted: string;
        percentage: number;
        initialDistance: number;
        formattedInitial: string;
    }) => React.ReactNode;
    className?: string;
    unit?: DistanceUnit;
    decimals?: number;
};
declare const DistanceDisplay: React.FC<DistanceDisplayProps>;

export { DistanceDisplay };
