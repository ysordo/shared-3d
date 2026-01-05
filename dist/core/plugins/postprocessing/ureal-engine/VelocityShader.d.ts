declare const VelocityShader: {
    uniforms: {
        previousModelViewMatrix: {
            value: null;
        };
        previousProjectionMatrix: {
            value: null;
        };
        modelViewMatrix: {
            value: null;
        };
        projectionMatrix: {
            value: null;
        };
    };
    vertexShader: string;
    fragmentShader: string;
};

export { VelocityShader };
