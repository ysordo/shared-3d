import React from 'react';

type DistanceUnit = 'm' | 'cm' | 'mm' | 'px' | 'in' | 'ft' | 'km';
type DistanceDisplayProps = {
    /** Render prop principal: recibe datos calculados en tiempo real */
    children: (data: {
        distance: number;
        formatted: string;
        percentage: number;
        initialDistance: number;
        formattedInitial: string;
    }) => React.ReactNode;
    /** Fallback renderizado mientras se obtiene la distancia inicial (opcional) */
    fallback?: React.ReactNode;
    className?: string;
    /** Unidad de medida para formato */
    unit?: DistanceUnit;
    /** Decimales para formato */
    decimals?: number;
};
/**
 * DistanceDisplay
 *
 * Componente que muestra en tiempo real la distancia cámara → centro del modelo activo.
 *
 * Problemas identificados y corregidos:
 * 1. **Renderizado condicional prematuro**: El `if (initialDistance === null)` estaba antes del cálculo de percentage → violación de Rules of Hooks en algunos renders.
 * 2. **Estado inicial null inconsistente**: `initialDistance` se establecía en el loop, pero percentage se calculaba en useEffect dependiente → race condition y renders sin datos.
 * 3. **Fallback confuso**: Prop `callback` no descriptiva → renombrada a `fallback`.
 * 4. **Cálculo de min/maxDistance duplicado y potencialmente costoso**: Ahora memoizado y recalculado solo cuando cambian plugins relevantes.
 *
 * Solución:
 * - Estado inicial consistente (distance = 0, initialDistance = 0).
 * - Cálculo síncrono inicial + loop continuo.
 * - Renderizado siempre del children con valores seguros (initialDistance = distance actual hasta primer cálculo válido).
 * - Limpieza robusta del RAF.
 *
 * @example
 * <DistanceDisplay unit="cm" decimals={1}>
 *   {({ formatted, percentage }) => (
 *     <div className="fixed bottom-4 left-4 bg-black/70 text-white p-4 rounded">
 *       Distancia: {formatted} ({percentage.toFixed(0)}%)
 *     </div>
 *   )}
 * </DistanceDisplay>
 */
declare const DistanceDisplay: React.FC<DistanceDisplayProps>;

export { DistanceDisplay };
