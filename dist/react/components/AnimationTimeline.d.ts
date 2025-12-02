import type React from 'react';
type TimelineStep = {
    clipName: string;
    duration?: number;
    delay?: number;
};
type AnimationTimelineProps = {
    steps: TimelineStep[];
    loop?: boolean;
    autoplay?: boolean;
};
export declare const AnimationTimeline: React.FC<AnimationTimelineProps>;
export {};
//# sourceMappingURL=AnimationTimeline.d.ts.map