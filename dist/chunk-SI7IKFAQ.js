// src/core/plugins/postprocessing/ureal-engine/SharpenPlugin.ts
import { Effect } from "postprocessing";
import { Uniform } from "three";
var SharpenEffect = class extends Effect {
  constructor(strength = 0.2) {
    super(
      "Sharpen",
      `
      uniform float strength;
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec4 blurred = inputColor; // placeholder, se puede reemplazar con convolution real
        outColor = inputColor + (inputColor - blurred) * strength;
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([["strength", new Uniform(strength)]])
      }
    );
  }
};

export {
  SharpenEffect
};
