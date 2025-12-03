import React from 'react';

type PostProcessingProps = {
    bloom?: {
        strength?: number;
        radius?: number;
        threshold?: number;
    };
    enabled?: boolean;
};
declare const PostProcessing: React.FC<PostProcessingProps>;

export { PostProcessing };
