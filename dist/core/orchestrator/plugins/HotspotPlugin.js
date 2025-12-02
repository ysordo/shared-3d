import { THREE } from '../../../lib';
export class HotspotPlugin {
    data;
    name = 'Hotspot';
    hotspots = new Map();
    constructor(data) {
        this.data = data;
    }
    install({ scene }) {
        this.data.forEach(hotspot => {
            const geometry = new THREE.SphereGeometry(0.3, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 0.5,
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(hotspot.position);
            if (hotspot.target) {
                mesh.userData.target = hotspot.target;
            }
            mesh.userData.hotspotId = hotspot.id;
            mesh.userData.onClick = hotspot.onClick;
            scene.add(mesh);
            this.hotspots.set(hotspot.id, mesh);
        });
    }
    dispose() {
        this.hotspots.forEach(mesh => {
            if (mesh.parent) {
                mesh.parent.remove(mesh);
            }
            mesh.geometry.dispose();
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach(mat => mat.dispose());
            }
            else {
                mesh.material.dispose();
            }
        });
        this.hotspots.clear();
    }
}
//# sourceMappingURL=HotspotPlugin.js.map