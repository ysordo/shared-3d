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
declare const OrbitControls: React.FC;

export { OrbitControls };
