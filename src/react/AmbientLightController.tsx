'use client';
import { type JSX, useState } from 'react';
import { AmbientLight } from './AmbientLight';

/**
 * Props for the AmbientLightController component.
 * @property {string} [className] - Additional CSS classes for styling
 * @property {number} [initialIntensity=0.5] - Initial intensity of the ambient light
 * @property {string} [initialColor='#ffffff'] - Initial color of the ambient light in hex format
 * @typedef {Object} AmbientLightControllerProps
 */
interface AmbientLightControllerProps {
  className?: string;
  initialIntensity?: number;
  initialColor?: string;
}

/**
 * Component to control ambient light in a 3D scene.
 * Allows users to adjust intensity and color of the ambient light.
 * @param {AmbientLightControllerProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {number} [props.initialIntensity=0.5] - Initial intensity of the ambient light
 * @param {string} [props.initialColor='#ffffff'] - Initial color of the ambient light in hex format
 * @returns {JSX.Element} Rendered component with controls for ambient light
 */
export function AmbientLightController({
  className,
  initialIntensity = 0.5,
  initialColor = '#ffffff',
}: AmbientLightControllerProps): JSX.Element {
  const [intensity, setIntensity] = useState<number>(initialIntensity);
  const [color, setColor] = useState<string>(initialColor);

  return (
    <div
      className={`bg-gray-900 bg-opacity-75 p-4 rounded-lg ${className || ''}`}>
      <h3 className="text-white text-lg font-bold mb-3">
        Control de Luz Ambiental
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-white block mb-1">
            Intensidad: {intensity.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-white block mb-1">Color:</label>
          <div className="flex items-center">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-10 cursor-pointer"
            />
            <span className="text-white ml-2">{color}</span>
          </div>
        </div>
      </div>

      {/* Componente de luz ambiental controlado */}
      <AmbientLight color={color} intensity={intensity} />
    </div>
  );
}
