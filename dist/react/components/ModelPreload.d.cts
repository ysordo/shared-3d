import { Dispatch, SetStateAction } from 'react';
import { ManifestEntries } from '../../core/cache/types.cjs';

type ModelPreloadProps = {
    /** Manifest de modelos a precargar */
    entries: ManifestEntries;
    /** Habilitar decodificación DRACO */
    draco?: boolean;
    onStatus?: Dispatch<SetStateAction<boolean>>;
    /** Render prop para mostrar lista de descargas en progreso */
    children: (progressList: {
        id: string;
        percent: number;
        status: 'loading' | 'completed' | 'error';
    }[], completed: number, total: number) => React.ReactNode;
};
/**
 * ModelPreload
 *
 * Componente declarativo para precarga paralela de modelos con feedback visual detallado.
 *
 * Características:
 * - Descarga completamente paralela (Promise.all) → máxima velocidad.
 * - Estado granular por modelo: id, percent, status (loading/completed/error).
 * - Render prop que recibe lista actualizada en tiempo real → perfecto para UI tipo "gestor de descargas".
 * - Integración segura con cache global (usePreload).
 * - Abort en unmount → evita race conditions.
 *
 * @example
 * <ModelPreload entries={manifest}>
 *   {(list) => (
 *     <div className="fixed bottom-4 left-4 space-y-2 bg-black/80 text-white p-4 rounded-lg">
 *       {list.map((item) => (
 *         <div key={item.id} className="flex items-center gap-4">
 *           <span className="w-32 truncate">{item.id}</span>
 *           <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
 *             <div
 *               className={`h-full transition-all duration-300 ${
 *                 item.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
 *               }`}
 *               style={{ width: `${item.percent}%` }}
 *             />
 *           </div>
 *           <span className="w-16 text-right">{item.percent.toFixed(0)}%</span>
 *           {item.status === 'error' && <span className="text-red-500">✗</span>}
 *         </div>
 *       ))}
 *     </div>
 *   )}
 * </ModelPreload>
 */
declare const ModelPreload: React.FC<ModelPreloadProps>;

export { ModelPreload };
