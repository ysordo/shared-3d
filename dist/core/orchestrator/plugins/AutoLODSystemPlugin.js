/* eslint-disable @typescript-eslint/no-explicit-any */
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
import { THREE } from '../../../lib/three';
export class AutoLODSystemPlugin {
    config;
    name = 'AutoLODSystem';
    lods = new Map();
    camera;
    constructor(config) {
        this.config = config;
        this.config.reductionPercentages = this.config.reductionPercentages || [0.5, 0.2];
    }
    simplifyGeometry(geometry, percentage) {
        const modifier = new SimplifyModifier();
        const count = Math.floor(geometry.attributes.position.count * percentage);
        return modifier.modify(geometry, count);
    }
    createLODLevels(model) {
        const lod = new THREE.LOD();
        /* === Level 0: original (high quality) === */
        const high = model.clone();
        high.visible = true;
        lod.addLevel(high, 0);
        /* === Level 1: 50% polygons === */
        const medium = model.clone();
        medium.traverse((child) => {
            if (child instanceof THREE.Mesh && child.geometry) {
                child.geometry = this.simplifyGeometry(child.geometry, this.config.reductionPercentages[0]);
            }
        });
        lod.addLevel(medium, this.config.distances[0]);
        /* === Level 2: 20% polygons === */
        const low = model.clone();
        low.traverse((child) => {
            if (child instanceof THREE.Mesh && child.geometry) {
                child.geometry = this.simplifyGeometry(child.geometry, this.config.reductionPercentages[1]);
            }
        });
        lod.addLevel(low, this.config.distances[1]);
        /* === Level 3: hide === */
        const empty = new THREE.Object3D();
        empty.visible = false;
        lod.addLevel(empty, this.config.distances[2]);
        return lod;
    }
    install({ camera, orchestrator }) {
        this.camera = camera;
        const applyLODToModel = (model) => {
            const lod = this.createLODLevels(model);
            if (model.parent) {
                model.parent.add(lod);
                model.parent.remove(model);
            }
            lod.position.copy(model.position);
            lod.quaternion.copy(model.quaternion);
            lod.scale.copy(model.scale);
            this.lods.set(model, lod);
        };
        const activeModel = orchestrator.getActiveModel();
        if (activeModel) {
            applyLODToModel(activeModel);
        }
        const originalSetModel = orchestrator.setModel;
        if (originalSetModel) {
            orchestrator.setModel = (...args) => {
                return originalSetModel.apply(orchestrator, args).then((model) => {
                    this.lods.forEach(lod => lod.parent?.remove(lod));
                    this.lods.clear();
                    applyLODToModel(model);
                    return model;
                });
            };
        }
        const update = () => {
            this.lods.forEach(lod => lod.update(this.camera));
            requestAnimationFrame(update);
        };
        update();
    }
    dispose() {
        this.lods.forEach(lod => {
            if (lod.parent) {
                lod.parent.remove(lod);
            }
            lod.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    child.geometry?.dispose();
                    if (Array.isArray(child.material)) {
                        child.material.forEach(m => m.dispose());
                    }
                    else {
                        child.material?.dispose();
                    }
                }
            });
        });
        this.lods.clear();
    }
}
//# sourceMappingURL=AutoLODSystemPlugin.js.map