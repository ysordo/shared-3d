import * as THREE from 'three';

type Halton = [number, number][]

export class FrameState {
  frame = 0;
  jitter = new THREE.Vector2();
  resolutionScale = 1.0;

  private halton: Halton = [
    [0.5, 0.333],
    [0.25, 0.667],
    [0.75, 0.111],
    [0.125, 0.444],
  ];

  update(camera: THREE.PerspectiveCamera, width: number, height: number) {
    const [x, y] = this.halton[this.frame % this.halton.length] as [number, number];
    this.jitter.set(x - 0.5, y - 0.5);

    camera.setViewOffset(
      width,
      height,
      this.jitter.x,
      this.jitter.y,
      width,
      height
    );

    this.frame++;
  }

  reset(camera: THREE.PerspectiveCamera) {
    camera.clearViewOffset();
    this.frame = 0;
  }
}
