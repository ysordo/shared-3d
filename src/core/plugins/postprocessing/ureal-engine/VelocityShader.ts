export const VelocityShader = {
  uniforms: {
    previousModelViewMatrix: { value: null },
    previousProjectionMatrix: { value: null },
    modelViewMatrix: { value: null },
    projectionMatrix: { value: null },
  },

  vertexShader: `
    uniform mat4 previousModelViewMatrix;
    uniform mat4 previousProjectionMatrix;

    varying vec4 vCurrentPos;
    varying vec4 vPrevPos;

    void main() {
      vCurrentPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vPrevPos = previousProjectionMatrix * previousModelViewMatrix * vec4(position, 1.0);
      gl_Position = vCurrentPos;
    }
  `,

  fragmentShader: `
    varying vec4 vCurrentPos;
    varying vec4 vPrevPos;

    void main() {
      vec2 current = vCurrentPos.xy / vCurrentPos.w;
      vec2 previous = vPrevPos.xy / vPrevPos.w;
      vec2 velocity = current - previous;
      gl_FragColor = vec4(velocity * 0.5 + 0.5, 0.0, 1.0);
    }
  `,
};