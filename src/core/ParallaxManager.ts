import type { THREE } from '..';


export class ParallaxManager {
    private objects: {id: string, mesh: THREE.Object3D, speed: number }[] = [];
    private handleScroll: () => void;
    public idActive?: string = undefined;
    public parallaxEffect?: (progress: number, on: (arg0: (mesh: THREE.Object3D) => void) => void) => void = undefined;

    /**
     * Creates an instance of ParallaxManager.
     * @remarks This class manages the parallax effect for registered meshes based on the scroll position.
     * @param camera The camera used in the scene.
     * @param parallaxEffect A function that defines the parallax effect to be applied to the meshes.
     */
    constructor(private camera: THREE.Camera) {
        this.handleScroll = this.onScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll);
    }

    /**
     * Registers a mesh to be affected by the parallax effect.
     * @remarks This method adds the specified mesh to the list of objects that will be moved based on the scroll position.
     * @param mesh The mesh to register.
     * @param speed The speed at which the mesh should move relative to the scroll position. Default is 0.5.
     * @returns void
     */
    public register(id: string, mesh: THREE.Object3D, speed: number = 0.5) {
        this.objects.push({id, mesh, speed });
    }

    /**
     * Unregisters a mesh from the parallax effect.
     * @remarks This method removes the specified mesh from the list of objects affected by the parallax effect.
     * @param mesh The mesh to unregister.
     * @returns void
     */
    public unregister(mesh: THREE.Object3D) {
        this.objects = this.objects.filter(obj => obj.mesh !== mesh);
    }

    /**
     * Handles the scroll event to update the position of registered objects based on their speed.
     * @remarks This method is called whenever the user scrolls the page.
     */
    private onScroll() {
        if (this.idActive && this.parallaxEffect) {
            const obj = this.objects.find(o => o.id === this.idActive)!;

            // Calcular el progreso del scroll (0 a 1)
            const scrollProgress = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
            
            // Actualizar la posición basada en el scroll y la velocidad
            obj.mesh.position.y = window.scrollY * obj.speed;
            obj.mesh.position.x = window.scrollX * obj.speed;
            obj.mesh.updateMatrixWorld();

            // Ejecutar el efecto de paralaje configurado por el cliente
            this.parallaxEffect(scrollProgress, (apply)=>apply(obj.mesh));
            
            this.updateCameraProjection();
        }
    }
    /**
     * Updates the camera's projection matrix.
     * @remarks This method should be called whenever the camera's properties change.
     */
    public updateCameraProjection() {
        this.camera.updateMatrixWorld();
    }

    /**
     * Destroys the ParallaxManager instance, removing all event listeners and clearing registered objects.
     * @remarks This method should be called when the ParallaxManager is no longer needed to prevent memory leaks.
     */
    public destroy() {
        window.removeEventListener('scroll', this.handleScroll);
        this.objects = [];
    }
}