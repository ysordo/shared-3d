import { OrbitControls } from 'three/examples/jsm/Addons.js';
import type { Plugin, PluginContext } from '../types';

  interface PluginConfig {
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

  private options: PluginConfig;

  constructor(
    partialOptions: Partial<PluginConfig> = {}
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
    const o = this.options;
    this.controls.enablePan = o.enablePan;
    this.controls.enableRotate = o.enableRotate;
    this.controls.enableZoom = o.enableZoom;
    this.controls.dampingFactor = o.dampingFactor;
    this.controls.panSpeed = o.panSpeed;
    this.controls.rotateSpeed = o.rotateSpeed;
    this.controls.zoomSpeed = o.zoomSpeed;
    this.controls.minDistance = o.minDistance;
    this.controls.maxDistance = o.maxDistance;
    this.controls.minPolarAngle = o.minPolarAngle;
    this.controls.maxPolarAngle = o.maxPolarAngle;
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
    newOptions: Partial<PluginConfig>
  ): void {
    this.options = { ...this.options, ...newOptions };
    this.applyOptionsToControls();
  }

  dispose(): void {
    this.controls.disconnect();
    this.controls.dispose();
  }
}