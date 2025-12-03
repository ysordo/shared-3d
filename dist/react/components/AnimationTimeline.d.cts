import React from 'react';

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
declare const AnimationTimeline: React.FC<AnimationTimelineProps>;

export { AnimationTimeline };
