import type { Box3, Scene, WebGLRenderer } from 'three';
import { ACESFilmicToneMapping, PCFSoftShadowMap, PerspectiveCamera, Sphere, Vector3 } from 'three';
import { EffectComposer, FXAAShader, ShaderPass} from 'three/examples/jsm/Addons';
import { RenderPass, SMAAPass, SSAARenderPass } from 'three/examples/jsm/Addons';
import type { OrbitControlsManager } from './OrbitControlsManager';

export class CameraManager extends PerspectiveCamera {
    public postProcessingEnabled: boolean = false;
    public composer?: EffectComposer;

    private readonly NEAR_MARGIN = 0.1;
    private readonly FAR_MULTIPLIER = 10;
    private readonly MARGIN: number = 0.8;


    constructor(private canvas: HTMLCanvasElement, public name: string = 'CameraManager', public fov: number = 75, public near: number = 0.1, public far: number = 1000) {
        super(fov, canvas.clientWidth/canvas.clientHeight, near, far);
    }

    public resize(box: Box3, pixelRatio: number): void {
        const newAspect = this.canvas.clientWidth / this.canvas.clientHeight;
        if (this.aspect === newAspect) {return;}
        this.aspect = newAspect;
        this.updateProjectionMatrix();
        const boundingSphere = new Sphere();
        box.getBoundingSphere(boundingSphere);
        const radius = boundingSphere.radius;
        const fovRad = this.fov * (Math.PI / 180);
        const horizontalFov = 2 * Math.atan(Math.tan(fovRad / 2) * newAspect);
        const distanceV = radius / Math.tan(fovRad / 2);
        const distanceH = radius / Math.tan(horizontalFov / 2);
        const cameraDistance = Math.max(distanceV, distanceH) * this.MARGIN;
        const currentLookAt = new Vector3();
        this.getWorldDirection(currentLookAt);
        this.position.copy(currentLookAt.multiplyScalar(-cameraDistance));
        this.lookAt(0, 0, 0);
        if (this.composer) {
            this.composer.setSize(
                this.canvas.clientWidth * pixelRatio,
                this.canvas.clientHeight * pixelRatio
            );
            this.composer.reset();
            this.composer.render();
        }
    }

    public setupPostProcessing(scene: Scene, render: WebGLRenderer): void {
        const {canvas} = this;
        if (!this.postProcessingEnabled) {return;}
        this.composer = new EffectComposer(render);
        render.toneMapping = ACESFilmicToneMapping;
        render.toneMappingExposure = 1;
        render.shadowMap.type = PCFSoftShadowMap;
        render.shadowMap.enabled = true;
        const renderPass = new RenderPass(scene, this);
        this.composer?.addPass(renderPass);
        const fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.uniforms['resolution'].value.set(
            1 / canvas.clientWidth, 
            1 / canvas.clientHeight
        );
        this.composer?.addPass(fxaaPass);
    }

    public reset(controls?: OrbitControlsManager, pos?: Vector3, target?: Vector3): void {
        if (pos && target) {
            this.position.copy(pos);
            this.lookAt(target);
            if (controls) {
            controls!.target.copy(target);
            controls.update();
            }
        }
    }

    public toAnimIPos(controls?: OrbitControlsManager, pos?: Vector3, target?: Vector3, duration: number = 1000): void {
        if (!pos || !target) {return;}
        const startPosition = this.position.clone();
        const startTarget = controls!.target.clone() || new Vector3();
        const startTime = performance.now();
        const animate = () => {
          const now = performance.now();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const t = 1 - Math.pow(1 - progress, 3);
          this.position.lerpVectors(startPosition, pos, t);
          const currentTarget = new Vector3();
          currentTarget.lerpVectors(startTarget, target, t);
          this.lookAt(currentTarget);
          if (controls) {
            controls!.target.copy(currentTarget);
            controls.update();
          }
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
    }
    public adjustClippingPlanes(center: Vector3, radius?: number): void {
        if (!radius) {return;}
        const distance = this.position.distanceTo(center);
        const near = Math.max(0.001, distance - radius - this.NEAR_MARGIN);
        const far = distance + radius * this.FAR_MULTIPLIER;
        if (Math.abs(this.near - near) > 0.001 || Math.abs(this.far - far) > 0.001) {
            this.near = near;
            this.far = far;
            this.updateProjectionMatrix();
        }
    }

    public recalculate(box: Box3) {
        const boundingSphere = new Sphere();
        box.getBoundingSphere(boundingSphere);
        const radius = boundingSphere.radius;
        const fovRad = this.fov * (Math.PI / 180);
        const aspect = this.aspect;
        const horizontalFov = 2 * Math.atan(Math.tan(fovRad / 2) * aspect);
        const distanceV = radius / Math.tan(fovRad / 2);
        const distanceH = radius / Math.tan(horizontalFov / 2);
        const cameraDistance = Math.max(distanceV, distanceH) * this.MARGIN;
        this.position.set(0, 0, cameraDistance);
        this.lookAt(0, 0, 0);
        return {radius, position: this.position.clone()};
    }
}