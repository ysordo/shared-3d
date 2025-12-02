/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { THREE } from '../../lib';
const PRESETS = {
    mirror: { reflective: true, color: 0xffffff, roughness: 0, metalness: 1 },
    glass: {
        reflective: true,
        color: 0x88ccff,
        roughness: 0,
        metalness: 0,
        opacity: 0.3,
        transparent: true,
    },
    metal: { reflective: true, color: 0x888888, roughness: 0.1, metalness: 1 },
    concrete: {
        reflective: false,
        color: 0x999999,
        roughness: 0.9,
        metalness: 0,
    },
    wood: { reflective: false, color: 0x8b4513, roughness: 0.8, metalness: 0 },
    water: {
        reflective: true,
        color: 0x0088ff,
        roughness: 0,
        metalness: 0.1,
        opacity: 0.7,
        transparent: true,
    },
    custom: { reflective: true, color: 0xffffff, roughness: 0, metalness: 1 },
};
export const GroundSurface = ({ type = 'mirror', size, height = 0, blur = 0.8, resolution = 1024, ...custom }) => {
    const orchestrator = useScene();
    const scene = orchestrator.scene;
    const camera = orchestrator.camera;
    useEffect(() => {
        if (!camera) {
            return;
        }
        const preset = PRESETS[type];
        const finalColor = custom.color ?? preset.color;
        const finalRoughness = custom.roughness ?? preset.roughness;
        const finalMetalness = custom.metalness ?? preset.metalness;
        const finalOpacity = custom.opacity ?? preset.opacity ?? 1;
        const finalTransparent = custom.transparent ?? preset.transparent ?? false;
        let ground;
        if (preset.reflective && size) {
            const geometry = new THREE.PlaneGeometry(size, size);
            ground = new Reflector(geometry, {
                clipBias: 0.003,
                textureWidth: resolution,
                textureHeight: resolution,
                color: new THREE.Color(finalColor),
            });
            if (Array.isArray(ground.material)) {
                ground.material.forEach((mat) => {
                    mat.roughness = finalRoughness;
                    mat.metalness = finalMetalness;
                    mat.opacity = finalOpacity;
                    mat.transparent = finalTransparent;
                });
            }
            else {
                ground.material.roughness = finalRoughness;
                ground.material.metalness = finalMetalness;
                ground.material.opacity = finalOpacity;
                ground.material.transparent = finalTransparent;
            }
        }
        else {
            const geometry = size
                ? new THREE.PlaneGeometry(size, size)
                : new THREE.PlaneGeometry(2, 2);
            const material = new THREE.MeshStandardMaterial({
                color: finalColor,
                roughness: finalRoughness,
                metalness: finalMetalness,
                opacity: finalOpacity,
                transparent: finalTransparent,
                side: THREE.DoubleSide,
            });
            ground = new THREE.Mesh(geometry, material);
            ground.receiveShadow = true;
            if (!size) {
                ground.onBeforeRender = () => {
                    const dist = camera.position.length();
                    const scale = dist * 10;
                    ground.scale.set(scale, scale, 1);
                };
            }
        }
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = height;
        scene.add(ground);
        return () => {
            scene.remove(ground);
            if ('material' in ground) {
                if (Array.isArray(ground.material)) {
                    ground.material.forEach((mat) => mat.dispose());
                }
                else {
                    ground.material.dispose();
                }
            }
            ground.geometry.dispose();
        };
    }, [type, size, height, blur, resolution, ...Object.values(custom)]);
    return null;
};
//# sourceMappingURL=GroundSurface.js.map