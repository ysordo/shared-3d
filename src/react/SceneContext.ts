'use client';
import { createContext, useContext } from 'react';
import type { SceneManager } from '../core/SceneManager';

/**
 * Contexto para manejar la escena y el canvas en la aplicación React.
 * Proporciona acceso al SceneManager y al canvas HTML.
 * @example
 * ```jsx
 * import { useSceneContext } from './SceneContext';
 * const MyComponent = () => {
 *   const { sceneManager, canvas } = useSceneContext();
 *   // Puedes usar sceneManager y canvas aquí
 *   return <div>My Scene Component</div>;
 * };
 * ```
 * @typedef {Object} SceneContextType
 * @property {SceneManager | null} sceneManager - Instancia del SceneManager para manejar la escena.
 * @property {HTMLCanvasElement | null} canvas - Elemento canvas HTML donde se renderiza la escena.
 * @see {@link SceneManager} para más detalles sobre cómo manejar la escena.
 * @see {@link useSceneContext} para acceder al contexto en componentes funcionales.
 * @see {@link SceneProvider} para proporcionar el contexto a los componentes hijos.
 * @see {@link SceneRenderer} para renderizar el canvas de la escena.
 * @see {@link ModelLoader} para cargar modelos en la escena.
 * @see {@link MaterialController} para controlar los materiales de los modelos en la escena.
 * @see {@link useScene} para acceder al SceneManager en componentes funcionales.
 * @see {@link SceneProviderProps} para las propiedades del proveedor de escena.
 * @see {@link SceneRendererProps} para las propiedades del renderizador de escena.
 */
export const SceneContext = createContext<{
  sceneManager: SceneManager | null;
  canvas: HTMLCanvasElement | null;
}>({ sceneManager: null, canvas: null });

export const useSceneContext = () => useContext(SceneContext);