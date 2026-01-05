// src/core/plugins/postprocessing/ureal-engine/MotionBlurPlugin.ts
import { Effect } from "postprocessing";
import { Uniform } from "three";
var MotionBlurPlugin = class {
  effect;
  velocityPass;
  constructor(velocityPass, intensity = 0.4) {
    this.velocityPass = velocityPass;
    this.effect = new Effect(
      "MotionBlur",
      `
      uniform sampler2D velocityTexture;
      uniform float intensity;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
          vec2 velocity = texture(velocityTexture, uv).rg * 2.0 - 1.0;

          // Muy simple: mezcla el color original con un desplazamiento por la velocidad
          vec2 offset = velocity * intensity * 0.02;
          vec3 blurred = texture(inputColor, uv + offset).rgb;

          outColor = vec4(mix(inputColor.rgb, blurred, intensity), 1.0);
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([
          ["velocityTexture", new Uniform(this.velocityPass.getTexture())],
          ["intensity", new Uniform(intensity)]
        ])
      }
    );
  }
  // Permite cambiar intensidad en tiempo real
  setIntensity(intensity) {
    this.effect.uniforms.get("intensity").value = intensity;
  }
};

export {
  MotionBlurPlugin
};
