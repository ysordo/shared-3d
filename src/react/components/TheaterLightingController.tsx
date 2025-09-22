'use client';
import { type JSX, useState } from 'react';

/**
 * Props for the LightingController component.
 * @property {string} [className] - Additional CSS classes for styling
 * @typedef {Object} LightingControllerProps
 */
interface LightingControllerProps {
  className?: string;
}

/**
 * Component to control lighting settings in a 3D scene.
 * Allows users to adjust intensity, number of lights, radius, height, and visibility of helpers.
 * @param {LightingControllerProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @returns {JSX.Element} Rendered component with controls for lighting
 */
export function LightingController({
  className,
}: LightingControllerProps): JSX.Element {
  const [intensity, setIntensity] = useState<number>(1.0);
  const [lightCount, setLightCount] = useState<number>(8);
  const [radiusFactor, setRadiusFactor] = useState<number>(1.8);
  const [height, setHeight] = useState<number>(2.5);
  const [showHelpers, setShowHelpers] = useState<boolean>(true);

  return (
    <div className={`bg-black bg-opacity-70 p-4 rounded-lg ${className || ''}`}>
      <h3 className="text-white text-lg font-bold mb-3">
        Control de Iluminación
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-white block mb-1">
            Intensidad: {intensity.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.1"
            max="3.0"
            step="0.1"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-white block mb-1">
            Número de luces: {lightCount}
          </label>
          <input
            type="range"
            min="4"
            max="16"
            step="1"
            value={lightCount}
            onChange={(e) => setLightCount(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-white block mb-1">
            Radio: {radiusFactor.toFixed(1)}
          </label>
          <input
            type="range"
            min="1.0"
            max="3.0"
            step="0.1"
            value={radiusFactor}
            onChange={(e) => setRadiusFactor(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-white block mb-1">
            Altura: {height.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.5"
            max="5.0"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-white flex items-center">
            <input
              type="checkbox"
              checked={showHelpers}
              onChange={(e) => setShowHelpers(e.target.checked)}
              className="mr-2"
            />
            Mostrar Helpers
          </label>
        </div>
      </div>
    </div>
  );
}
