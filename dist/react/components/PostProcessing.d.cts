type PostProcessingProps = {
    strength?: number;
    radius?: number;
    threshold?: number;
    enabled?: boolean;
};
/**
 * Post Processing
 *
 * Declarative component for configurable and reactive bloom effect.
 *
 * Key fix:
 * -Removed early return conditional → avoids violation of Rules of Hooks.
 * -Enable control via prop enabled in config → usePlugin decides to create or disable hot.
 * -When enabled=false the plugin is not created (deep equality prevents installation) → zero real overhead.
 *
 * @example
 * <PostProcessing enabled={enableBloom} strength={1.8} />
 */
declare const PostProcessing: React.FC<PostProcessingProps>;

export { PostProcessing };
