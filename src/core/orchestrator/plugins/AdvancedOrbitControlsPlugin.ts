import { OrbitControls } from 'three/examples/jsm/Addons.js';
import type { Plugin, PluginContext } from '../types';

  export interface AOCPluginConfig {
    enablePan: boolean;
    enableRotate: boolean;
    enableZoom: boolean;
    dampingFactor: number;
    panSpeed: number;
    rotateSpeed: number;
    zoomSpeed: number;
    minDistance: number;
    maxDistance: number;
    minPolarAngle: number;
    maxPolarAngle: number;
  }

/**
 * AdvancedOrbitControlsPlugin
 * 
 * Plugin avanzado de controles de órbita para navegación intuitiva en escenas 3D.
 * 
 * Características principales:
 * - Wrapper configurable y reactivo sobre Three.js OrbitControls.
 * - Soporte completo para damping, límites de distancia/ángulo, velocidades y habilitación individual de pan/rotate/zoom.
 * - Integración con el loop centralizado del SceneOrchestrator mediante preRender() (un único update() por frame).
 * - API de actualización en caliente vía update() y setters/getters públicos para control imperativo desde React.
 * - Configuración inicial flexible mediante opciones parciales (valores por defecto sensatos).
 * - Limpieza completa de eventos y recursos en dispose().
 * 
 * Perfecto para viewers de productos, visualizadores arquitectónicos o cualquier experiencia donde se requiera
 * navegación orbital fluida y altamente configurable sin exponer directamente OrbitControls al consumidor.
 * 
 * @example
 * new AdvancedOrbitControlsPlugin({
 *   enablePan: false,
 *   minDistance: 2,
 *   maxDistance: 10,
 *   dampingFactor: 0.08
 * })
 */
export class AdvancedOrbitControlsPlugin implements Plugin {
  public readonly name = 'AdvancedOrbitControls';

  private controls!: OrbitControls;

  private options: AOCPluginConfig;

  constructor(
    partialOptions: Partial<AOCPluginConfig> = {}
  ) {
    this.options = {
      enablePan: true,
      enableRotate: true,
      enableZoom: true,
      dampingFactor: 0.05,
      panSpeed: 1,
      rotateSpeed: 1,
      zoomSpeed: 1,
      minDistance: 0.1,
      maxDistance: 1000,
      minPolarAngle: 0,
      maxPolarAngle: Math.PI,
      ...partialOptions,
    };
  }

  install({ camera, renderer }: PluginContext): void {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.applyOptionsToControls();
    this.controls.enableDamping = true;
  }

  preRender(): void {
    this.controls.update();
  }

  private applyOptionsToControls(): void {
    this.controls.enablePan = this.controls.enablePan;
    this.controls.enableRotate = this.controls.enableRotate;
    this.controls.enableZoom = this.controls.enableZoom;
    this.controls.dampingFactor = this.controls.dampingFactor;
    this.controls.panSpeed = this.controls.panSpeed;
    this.controls.rotateSpeed = this.controls.rotateSpeed;
    this.controls.zoomSpeed = this.controls.zoomSpeed;
    this.controls.minDistance = this.controls.minDistance;
    this.controls.maxDistance = this.controls.maxDistance;
    this.controls.minPolarAngle = this.controls.minPolarAngle;
    this.controls.maxPolarAngle = this.controls.maxPolarAngle;
  }

  set enablePan(enabled: boolean) {
    this.options.enablePan = enabled;
    this.controls.enablePan = enabled;
  }
  get enablePan(): boolean {
    return this.controls.enablePan;
  }

  set enableRotate(enabled: boolean) {
    this.options.enableRotate = enabled;
    this.controls.enableRotate = enabled;
  }
  get enableRotate(): boolean {
    return this.controls.enableRotate;
  }

  set enableZoom(enabled: boolean) {
    this.options.enableZoom = enabled;
    this.controls.enableZoom = enabled;
  }
  get enableZoom(): boolean {
    return this.controls.enableZoom;
  }

  set minDistance(distance: number) {
    this.options.minDistance = distance;
    this.controls.minDistance = distance;
  }
  get minDistance(): number {
    return this.controls.minDistance;
  }

  set maxDistance(distance: number) {
    this.options.maxDistance = distance;
    this.controls.maxDistance = distance;
  }
  get maxDistance(): number {
    return this.controls.maxDistance;
  }

  update(
    newOptions: Partial<AOCPluginConfig>
  ): void {
    Object.keys(newOptions).forEach((key) => {
      if(newOptions[key as keyof AOCPluginConfig]!==undefined && this.options[key as keyof AOCPluginConfig] !== newOptions[key as keyof AOCPluginConfig])  {
        this.options[key as keyof AOCPluginConfig] = newOptions[key as keyof AOCPluginConfig] as never;
      }
    });
    this.applyOptionsToControls();
  }

  dispose(): void {
    this.controls.disconnect();
    this.controls.dispose();
  }
}