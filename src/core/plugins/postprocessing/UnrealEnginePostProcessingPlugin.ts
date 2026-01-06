import * as POST from 'postprocessing';
import { FrameState } from './ureal-engine/FrameState';
import { VelocityPassPlugin } from './ureal-engine/VelocityPassPlugin';
import { AOPlugin } from './ureal-engine/AOPlugin';
import { GILitePlugin } from './ureal-engine/GILitePlugin';
import { BloomPlugin } from './ureal-engine/BloomPlugin';
import { MotionBlurPlugin } from './ureal-engine/MotionBlurPlugin';
import { TAAPlugin } from './ureal-engine/TAAPlugin';
import { SharpenEffect } from './ureal-engine/SharpenEffect';
import type { PluginContext, Plugin } from '../types';
import { THREE } from '../../../lib';

export type UnrealEnginePostProcessingConfig = {
  bloom?: { intensity?: number; luminanceThreshold?: number };
  motionBlur?: { intensity?: number };
  taa?: { blend?: number };
  sharpen?: { strength?: number };
  toneMappingExposure?: number;
  lodLevels?: number; // Para Nanite-like (niveles de LOD)
};

const DEFAULT_UNREAL_ENGINE_PP_CONFIG: Required<UnrealEnginePostProcessingConfig> = {
  bloom: { intensity: 0.4, luminanceThreshold: 1.2 },
  motionBlur: { intensity: 0.4 },
  taa: { blend: 0.9 },
  sharpen: { strength: 0.2 },
  toneMappingExposure: 1.1,
  lodLevels: 5, // Niveles de LOD para polígonos "infinitos"
};

export class UnrealEnginePostProcessingPlugin implements Plugin {
  name = 'UnrealEnginePostProcessing';

  composer!: POST.EffectComposer;
  frameState = new FrameState();
  velocity!: VelocityPassPlugin;
  ao!: AOPlugin;
  gi!: GILitePlugin;
  bloom!: BloomPlugin;
  motion!: MotionBlurPlugin;
  taa!: TAAPlugin;
  sharpen!: SharpenEffect;
  camera!: THREE.PerspectiveCamera;
  domElement!: HTMLElement;
  scene!: THREE.Scene;

  private sceneRenderTarget!: THREE.WebGLRenderTarget;
  private lodGroup = new THREE.Group(); // Para Nanite-like LOD management

  private config: Required<UnrealEnginePostProcessingConfig>;

  constructor(config?: Partial<UnrealEnginePostProcessingConfig>) {
    this.config = { ...DEFAULT_UNREAL_ENGINE_PP_CONFIG, ...config };
  }

  install(context: PluginContext) {
    const {scene, camera, renderer} = context;
    this.camera = camera;
    this.domElement = renderer.domElement;
    this.scene = scene;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure!;

    const width = renderer.domElement.width;
    const height = renderer.domElement.height;

    this.composer = new POST.EffectComposer(renderer);

    // Scene render target para GI y Motion Blur
    this.sceneRenderTarget = new THREE.WebGLRenderTarget(width, height, {
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      samples: 8, // MSAA para high-res realism
    });

    // Plugins internos
    this.velocity = new VelocityPassPlugin(width, height);
    this.velocity.install(context);
    this.ao = new AOPlugin( width, height);
    this.ao.install(context);
    this.gi = new GILitePlugin(this.velocity, this.sceneRenderTarget);
    this.gi.install(context);
    this.bloom = new BloomPlugin();
    this.bloom.install(context);
    this.motion = new MotionBlurPlugin(this.velocity, this.config.motionBlur!.intensity!);
    this.motion.install(context);
    this.taa = new TAAPlugin(this.velocity);
    this.taa.install(context);
    this.sharpen = new SharpenEffect(0.2);

    // Aplicar configs iniciales
    this.bloom.effect.intensity = this.config.bloom!.intensity!;
    this.bloom.effect.luminanceMaterial.threshold = this.config.bloom!.luminanceThreshold!;
    this.taa.setBlend(this.config.taa!.blend!);

    // RenderPass estándar
    const renderPass = new POST.RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    // Pase para realismo (AO + GI + Bloom)
    const realismPass = new POST.EffectPass(
      camera,
      this.ao.effect,
      this.gi.effect,
      this.bloom.effect
    );
    this.composer.addPass(realismPass);

    // Pase final (TAA + Motion Blur + Sharpen)
    const finalPass = new POST.EffectPass(
      camera,
      this.taa.effect,
      this.motion.effect,
      this.sharpen
    );
    this.composer.addPass(finalPass);

    // Nanite-like: Agregar LOD para meshes high-poly
    this.setupNaniteLOD(scene);
  }

  private setupNaniteLOD(scene: THREE.Scene) {
    // Recorre la escena y agrega LOD a meshes con > 100k verts (ajusta threshold)
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry.attributes.position.count > 100000) {
        const lod = new THREE.LOD();
        for (let i = 0; i < this.config.lodLevels; i++) {
          const decimatedMesh = child.clone(); // Aquí usa decimación real (usa geometry-utils o external lib)
          decimatedMesh.geometry = this.decimateGeometry(decimatedMesh.geometry, i);
          lod.addLevel(decimatedMesh, i * 50); // Distancia basada en nivel
        }
        child.parent?.add(lod);
        child.parent?.remove(child);
      }
    });
    scene.add(this.lodGroup);
  }

  private decimateGeometry(geometry: THREE.BufferGeometry, level: number) {
    // Placeholder para decimación (usa three.js GeometryUtils o external como Meshopt)
    // En real: reduce verts por level (ej: 1 - level * 0.2)
    return geometry; // Implementa decimación real para Nanite
  }

  postRender() {
    const renderer = this.composer.getRenderer();
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;

    // Actualizar jitter frame
    this.frameState.update(this.camera, width, height);

    // Render velocity
    this.velocity.render(renderer, this.scene, this.camera);

    // GI con escena
    //this.gi.renderScene(renderer, this.scene, this.camera);

    // Actualizar TAA y Motion Blur
    this.taa.update(this.sceneRenderTarget.texture);
    this.motion.update({texture: this.sceneRenderTarget.texture});

    // Render final único
    this.composer.render();
  }

  resize(width: number, height: number) {
    this.composer.setSize(width, height);
    this.velocity.resize(width, height);
    this.sceneRenderTarget.setSize(width, height);
    this.ao.resize(width,height);
  }

  update(newConfig: Partial<UnrealEnginePostProcessingConfig>): void {
    this.config = { ...this.config, ...newConfig };

    // Bloom
    if (newConfig.bloom) {
      if (newConfig.bloom.intensity !== undefined) {
        this.bloom.effect.intensity = newConfig.bloom.intensity;
      }
      if (newConfig.bloom.luminanceThreshold !== undefined) {
        this.bloom.effect.luminanceMaterial.threshold = newConfig.bloom.luminanceThreshold;
      }
    }

    // Motion Blur
    if (newConfig.motionBlur?.intensity !== undefined) {
      this.motion.update?.({intensity: newConfig.motionBlur.intensity});
    }

    // TAA
    if (newConfig.taa?.blend !== undefined) {
      this.taa.setBlend(newConfig.taa.blend);
    }

    // Sharpen
    if (newConfig.sharpen?.strength !== undefined) {
      this.sharpen.uniforms.get('strength')!.value = newConfig.sharpen.strength;
    }

    // Tone Mapping Exposure
    if (newConfig.toneMappingExposure !== undefined) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
  }

  dispose() {
    this.composer.dispose();
    this.velocity.dispose();
    this.sceneRenderTarget.dispose();
  }
}