import { ACESFilmicToneMapping, PCFSoftShadowMap, PerspectiveCamera, Sphere, Vector3 } from 'three';
import { EffectComposer, FXAAShader, ShaderPass } from 'three/examples/jsm/Addons';
import { RenderPass } from 'three/examples/jsm/Addons';
export class CameraManager extends PerspectiveCamera {
    constructor(canvas, name = 'CameraManager', fov = 75, near = 0.1, far = 1000) {
        super(fov, canvas.clientWidth / canvas.clientHeight, near, far);
        this.canvas = canvas;
        this.name = name;
        this.fov = fov;
        this.near = near;
        this.far = far;
        this.postProcessingEnabled = false;
        this.NEAR_MARGIN = 0.1;
        this.FAR_MULTIPLIER = 10;
        this.MARGIN = 0.8;
    }
    resize(box, pixelRatio) {
        const newAspect = this.canvas.clientWidth / this.canvas.clientHeight;
        if (this.aspect === newAspect) {
            return;
        }
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
            this.composer.setSize(this.canvas.clientWidth * pixelRatio, this.canvas.clientHeight * pixelRatio);
            this.composer.reset();
            this.composer.render();
        }
    }
    setupPostProcessing(scene, render) {
        const { canvas } = this;
        if (!this.postProcessingEnabled) {
            return;
        }
        this.composer = new EffectComposer(render);
        render.toneMapping = ACESFilmicToneMapping;
        render.toneMappingExposure = 1;
        render.shadowMap.type = PCFSoftShadowMap;
        render.shadowMap.enabled = true;
        const renderPass = new RenderPass(scene, this);
        this.composer?.addPass(renderPass);
        const fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.uniforms['resolution'].value.set(1 / canvas.clientWidth, 1 / canvas.clientHeight);
        this.composer?.addPass(fxaaPass);
    }
    reset(controls, pos, target) {
        if (pos && target) {
            this.position.copy(pos);
            this.lookAt(target);
            if (controls) {
                controls.controls.target.copy(target);
                controls.update();
            }
        }
    }
    toAnimIPos(controls, pos, target, duration = 1000) {
        if (!pos || !target) {
            return;
        }
        const startPosition = this.position.clone();
        const startTarget = controls?.controls.target.clone() || new Vector3();
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
                controls.controls.target.copy(currentTarget);
                controls.update();
            }
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }
    adjustClippingPlanes(center, radius) {
        if (!radius) {
            return;
        }
        const distance = this.position.distanceTo(center);
        const near = Math.max(0.001, distance - radius - this.NEAR_MARGIN);
        const far = distance + radius * this.FAR_MULTIPLIER;
        if (Math.abs(this.near - near) > 0.001 || Math.abs(this.far - far) > 0.001) {
            this.near = near;
            this.far = far;
            this.updateProjectionMatrix();
        }
    }
    recalculate(box) {
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
        return { radius, position: this.position.clone() };
    }
}
//# sourceMappingURL=CameraManager.js.map