/* eslint-disable no-console */
import * as THREE from 'three';
import { GLTFLoader } from '../loaders/GLTFLoader';
import { HDRILoader } from '../loaders/HDRILoader';
export class SceneOrchestrator {
    static instance = null;
    scene;
    camera;
    renderer;
    activeModel = null;
    activeHDRI = null;
    canvas;
    animationId = null;
    plugins = new Map();
    resizeHandler;
    constructor(canvas, config = {}) {
        this.canvas = canvas;
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: config.antialias ?? true,
            alpha: false,
            powerPreference: 'high-performance',
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.shadowMap.enabled = config.shadows ?? true;
        this.renderer.toneMapping = config.toneMapping ?? THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = config.toneMappingExposure ?? 1.0;
        if (config.clearColor) {
            this.renderer.setClearColor(config.clearColor);
        }
        this.camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 1.6, 5);
        this.scene = new THREE.Scene();
        if (config.background instanceof THREE.Texture) {
            this.scene.background = config.background;
            this.scene.environment = config.background;
        }
        else if (config.background) {
            this.scene.background = new THREE.Color(config.background);
        }
        this.resizeHandler = () => {
            const { clientWidth, clientHeight } = this.canvas;
            this.renderer.setSize(clientWidth, clientHeight);
            this.camera.aspect = clientWidth / clientHeight;
            this.camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', this.resizeHandler);
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
    static getInstance(canvas, config) {
        if (!SceneOrchestrator.instance) {
            if (!canvas) {
                throw new Error('Canvas is required on first initialization');
            }
            SceneOrchestrator.instance = new SceneOrchestrator(canvas, config);
        }
        return SceneOrchestrator.instance;
    }
    /* === PLUGIN SYSTEM === */
    use(plugin) {
        if (this.plugins.has(plugin.name)) {
            console.warn(`[Orchestrator] Plugin "${plugin.name}" ya está instalado`);
            return this;
        }
        const context = {
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer,
            orchestrator: this,
        };
        try {
            plugin.install(context);
            this.plugins.set(plugin.name, plugin);
            console.info(`[Orchestrator] Plugin instalado: ${plugin.name}`);
        }
        catch (err) {
            console.error(`[Orchestrator] Error instalando plugin ${plugin.name}:`, err);
        }
        return this;
    }
    /* === MODELS === */
    async setModel(entry, options) {
        console.info(`[Orchestrator] Cambiando modelo → ${entry.id}`);
        if (this.activeModel) {
            this.scene.remove(this.activeModel);
            this.activeModel = null;
        }
        const model = await GLTFLoader.load(entry, {
            draco: options?.draco,
            onLoaded: (obj) => {
                this.activeModel = obj;
                this.scene.add(obj);
                console.info(`[Orchestrator] Modelo activo: ${entry.id}`);
            },
            onError: (err) => {
                console.error(`[Orchestrator] Error cargando modelo ${entry.id}`, err);
            },
        });
        return model;
    }
    removeModel() {
        if (this.activeModel) {
            this.scene.remove(this.activeModel);
            this.activeModel = null;
        }
    }
    /* === HDRI === */
    async setHDRI(entry) {
        if (this.activeHDRI) {
            this.activeHDRI.dispose();
        }
        const texture = await HDRILoader.load(entry, {
            onLoaded: (tex) => {
                this.activeHDRI = tex;
                this.scene.environment = tex;
                this.scene.background = tex;
                console.info(`[Orchestrator] HDRI activo: ${entry.id}`);
            },
        });
        return texture;
    }
    clearHDRI() {
        if (this.activeHDRI) {
            this.scene.environment = null;
            this.scene.background = new THREE.Color(0x000000);
            this.activeHDRI.dispose();
            this.activeHDRI = null;
        }
    }
    /* === CLEANING === */
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        window.removeEventListener('resize', this.resizeHandler);
        for (const plugin of this.plugins.values()) {
            plugin.dispose?.();
        }
        this.plugins.clear();
        this.removeModel();
        this.clearHDRI();
        this.renderer.dispose();
        this.renderer.forceContextLoss?.();
        this.canvas.width = 1;
        this.canvas.height = 1;
        SceneOrchestrator.instance = null;
        console.info('[Orchestrator] Disposed completamente');
    }
    /* === GETTERS === */
    getActiveModel() {
        return this.activeModel;
    }
    getActiveHDRI() {
        return this.activeHDRI;
    }
}
//# sourceMappingURL=SceneOrchestrator.js.map