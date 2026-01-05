import { Effect } from 'postprocessing';
import { Uniform } from 'three';

export class SharpenEffect extends Effect {
  constructor(strength = 0.2) {
    super(
      'Sharpen',
      `
      uniform float strength;
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec4 blurred = inputColor; // placeholder, se puede reemplazar con convolution real
        outColor = inputColor + (inputColor - blurred) * strength;
      }
      `,
      { 
        uniforms: new Map<string, Uniform<any>>([['strength', new Uniform(strength)]])
    }
    );
  }
}
