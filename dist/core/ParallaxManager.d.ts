import type { THREE } from '..';
export declare class ParallaxManager {
    private camera;
    private objects;
    private handleScroll;
    idActive?: string;
    parallaxEffect?: (progress: number, on: (arg0: (mesh: THREE.Object3D) => void) => void) => void;
    /**
     * Creates an instance of ParallaxManager.
     * @remarks This class manages the parallax effect for registered meshes based on the scroll position.
     * @param camera The camera used in the scene.
     * @param parallaxEffect A function that defines the parallax effect to be applied to the meshes.
     */
    constructor(camera: THREE.Camera);
    /**
     * Registers a mesh to be affected by the parallax effect.
     * @remarks This method adds the specified mesh to the list of objects that will be moved based on the scroll position.
     * @param mesh The mesh to register.
     * @param speed The speed at which the mesh should move relative to the scroll position. Default is 0.5.
     * @returns void
     */
    register(id: string, mesh: THREE.Object3D, speed?: number): void;
    /**
     * Unregisters a mesh from the parallax effect.
     * @remarks This method removes the specified mesh from the list of objects affected by the parallax effect.
     * @param mesh The mesh to unregister.
     * @returns void
     */
    unregister(mesh: THREE.Object3D): void;
    /**
     * Handles the scroll event to update the position of registered objects based on their speed.
     * @remarks This method is called whenever the user scrolls the page.
     */
    private onScroll;
    /**
     * Updates the camera's projection matrix.
     * @remarks This method should be called whenever the camera's properties change.
     */
    updateCameraProjection(): void;
    /**
     * Destroys the ParallaxManager instance, removing all event listeners and clearing registered objects.
     * @remarks This method should be called when the ParallaxManager is no longer needed to prevent memory leaks.
     */
    destroy(): void;
}
//# sourceMappingURL=ParallaxManager.d.ts.map