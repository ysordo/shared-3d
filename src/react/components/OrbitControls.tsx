'use client';

import { usePlugin } from '../../hooks/usePlugin';
import { OrbitControlsPlugin } from '../../core/orchestrator/plugins/OrbitControlsPlugin';

/**
 * OrbitControls
 * 
 * Componente declarativo minimalista para activar controles orbitales estándar.
 * 
 * Características:
 * - Configuración fija y optimizada por defecto (damping, límites seguros).
 * - Integración óptima con usePlugin inteligente: instancia única y estable.
 * - Zero configuración requerida → plug-and-play.
 * - Componente headless puro (sin renderizado visual propio).
 * 
 * Recomendado para casos simples donde basta con navegación orbital fluida.
 * Para configuración dinámica/reactiva usar <AdvancedOrbitControls />.
 * 
 * @example
 * <OrbitControls />
 */
export const OrbitControls: React.FC = () => {
  // Configuración vacía → nunca cambia → instancia única permanente
  const config = {};

  // Factory estable (sin dependencias)
  const factory = () => new OrbitControlsPlugin();

  // usePlugin garantiza creación única y dispose seguro
  usePlugin(factory, config);

  return null;
};