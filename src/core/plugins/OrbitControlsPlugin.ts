import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Plugin, PluginContext } from './types';

/**
 * OrbitControlsPlugin
 * 
 * Plugin básico de controles orbitales estándar para navegación fluida en escenas 3D.
 * 
 * Características principales:
 * - Wrapper mínimo y estable sobre Three.js OrbitControls con configuración sensible por defecto.
 * - Damping activado para movimiento natural e inercia.
 * - Límites razonables (distancia, ángulo polar) para evitar comportamientos extremos.
 * - Integración completa con el loop centralizado del SceneOrchestrator mediante preRender()
 *   (elimina RAF propio → un único update por frame global).
 * - Getters públicos para inspección de estado (útil en combinaciones con otros plugins).
 * - Limpieza segura en dispose().
 * 
 * Recomendado como base simple cuando no se necesita configuración avanzada o reactiva.
 * Para mayor control (hot-updates, setters, opciones dinámicas) usar AdvancedOrbitControlsPlugin.
 * 
 * @example
 * new OrbitControlsPlugin() // configuración por defecto lista para producción
 */
export class OrbitControlsPlugin implements Plugin {
  public readonly name = 'OrbitControls';

  private controls!: OrbitControls;

  install({ camera, renderer }: PluginContext): void {
    this.controls = new OrbitControls(camera, renderer.domElement);

    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.8;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50;
    this.controls.maxPolarAngle = Math.PI / 2.1;
  }

  preRender(): void {
    this.controls.update();
  }

  get maxDistance(): number {
    return this.controls.maxDistance;
  }

  get minDistance(): number {
    return this.controls.minDistance;
  }

  get enableRotate(): boolean {
    return this.controls.enableRotate;
  }

  get enableZoom(): boolean {
    return this.controls.enableZoom;
  }

  get enablePan(): boolean {
    return this.controls.enablePan;
  }

  dispose(): void {
    this.controls.dispose();
  }
}