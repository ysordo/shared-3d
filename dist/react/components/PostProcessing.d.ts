type PostProcessingProps = {
    strength?: number;
    radius?: number;
    threshold?: number;
    enabled?: boolean;
};
/**
 * PostProcessing
 *
 * Componente declarativo para efecto bloom configurable y reactivo.
 *
 * Corrección clave:
 * - Eliminado early return condicional → evita violación de Rules of Hooks.
 * - Control de habilitación mediante prop enabled en config → usePlugin decide crear o desactivar en caliente.
 * - Cuando enabled=false el plugin no se crea (deep equality evita instalación) → zero overhead real.
 *
 * @example
 * <PostProcessing enabled={enableBloom} strength={1.8} />
 */
declare const PostProcessing: React.FC<PostProcessingProps>;

export { PostProcessing };
