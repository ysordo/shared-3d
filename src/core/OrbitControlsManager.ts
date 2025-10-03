import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { THREE } from '..';

export class OrbitControlsManager extends OrbitControls {
  private model?: THREE.Object3D<THREE.Object3DEventMap>;
  
  public eRotate: boolean=true;
  public ePan: boolean=true;
  public eZoom: boolean = true;

  private isRotating: boolean = false;
  private isPanning: boolean = false;
  private isZooming: boolean = false;

  private startMousePosition: THREE.Vector2 = new THREE.Vector2();
  private currentMousePosition: THREE.Vector2 = new THREE.Vector2();
  private startPointerPosition: THREE.Vector2 = new THREE.Vector2();
  private currentPointerPosition: THREE.Vector2 = new THREE.Vector2();
  private previousTouchDistance: number = 0;

  

  constructor(public camera: THREE.Camera, public domElement: HTMLElement) {
    super(camera, domElement);

    this.enableRotate=false;  
    this.enablePan=false;  
    this.enableZoom=false;
  }

  public setModel(model: THREE.Object3D): void {
    this.model = model;
    // Events setup
    this.setupEvents();
  }
   private setupEvents() {
    // Mouse events
    this.domElement.addEventListener('mousedown', this.onPointerDown.bind(this));
    this.domElement.addEventListener('mousemove', this.onPointerMove.bind(this));
    this.domElement.addEventListener('mouseup', this.onPointerUp.bind(this));
    this.domElement.addEventListener('mouseleave', this.onPointerUp.bind(this));
    
    // Thouch events
    this.domElement.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    this.domElement.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    this.domElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    this.domElement.addEventListener('touchcancel', this.onTouchEnd.bind(this));
    
    // Prevent context menu and tactile screen displacement
    this.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

    this.domElement.addEventListener('wheel', this.handleWheelZoom.bind(this), { passive: false });
  }
  
  private handleWheelZoom(e: WheelEvent): void {
    if (!this.eZoom || !this.model) {return;}
    
    e.preventDefault();
    e.stopPropagation();
    
    const zoomDelta = e.deltaY > 0 ? -this.zoomSpeed : this.zoomSpeed;
    this.applyCameraZoom(zoomDelta);
  }

  private applyCameraZoom(zoomDelta: number): void {
    if (!this.model) {return;}

    const direction = new THREE.Vector3();
    direction.subVectors(this.camera.position, this.model.position).normalize();

    const currentDistance = this.camera.position.distanceTo(this.model.position);
    let newDistance = currentDistance + zoomDelta;
    
    newDistance = THREE.MathUtils.clamp(newDistance, this.minDistance, this.maxDistance);
    
    if (newDistance === currentDistance) {return;}
    
    this.camera.position.copy(this.model.position).add(direction.multiplyScalar(newDistance));
    this.target.copy(this.model.position);
    this.update();
  }

  private getPointerPosition(event: MouseEvent | TouchEvent): { x: number; y: number } {
    if ('touches' in event && event.touches.length > 0) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    } else if ('clientX' in event) {
      return { 
        x: event.clientX, 
        y: event.clientY 
      };
    }
    return { x: 0, y: 0 };
  }
  
  private onPointerDown(e: MouseEvent | TouchEvent): void {
    if ('touches' in e) {
      this.onTouchStart(e as TouchEvent);
      return;
    }
    
    if (e.button === 0 && this.eRotate) {
      this.isRotating = true;
      const pos = this.getPointerPosition(e);
      this.startPointerPosition.set(pos.x, pos.y);
      e.preventDefault();
    } else if (e.button === 2 && this.ePan) {
      this.isPanning = true;
      const pos = this.getPointerPosition(e);
      this.startPointerPosition.set(pos.x, pos.y);
      e.preventDefault();
    }
  }
  
  private onPointerMove(e: MouseEvent | TouchEvent): void {
    // For touch events, we handle in onTouchMove
    if ('touches' in e) {
      this.onTouchMove(e as TouchEvent);
      return;
    }
    
    const pos = this.getPointerPosition(e);
    this.currentPointerPosition.set(pos.x, pos.y);
    
    if (this.isRotating) {
      this.handleModelRotation();
      e.preventDefault();
    } else if (this.isPanning) {
      this.handleModelPan();
      e.preventDefault();
    }
    
    this.startPointerPosition.copy(this.currentPointerPosition);
  }
  
  private onPointerUp(): void {
    this.isRotating = false;
    this.isPanning = false;
  }
  
  private onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    
    if (e.touches.length === 1) {
      if (this.eRotate) {
        this.isRotating = true;
        const pos = this.getPointerPosition(e);
        this.startPointerPosition.set(pos.x, pos.y);
      }
    } else if (e.touches.length === 2) {
      // Con 2 dedos: determinar si es pan o zoom
      const currentDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      // Si la distancia inicial es muy pequeña, probablemente es pan
      // Si es mayor, probablemente es zoom
      if (currentDistance < 50 && this.ePan) {
        this.isPanning = true;
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        this.startPointerPosition.set(midX, midY);
      } else if (this.eZoom) {
        this.isZooming = true;
        this.previousTouchDistance = currentDistance;
      }
    }
  }
  
   private onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    
    if (e.touches.length === 1 && this.isRotating) {
      // Rotación con 1 dedo
      const pos = this.getPointerPosition(e);
      this.currentPointerPosition.set(pos.x, pos.y);
      this.handleModelRotation();
      this.startPointerPosition.copy(this.currentPointerPosition);
      
    } else if (e.touches.length === 2) {
      if (this.isPanning) {
        // Pan con 2 dedos (dedos juntos)
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        this.currentPointerPosition.set(midX, midY);
        
        this.handleModelPan();
        this.startPointerPosition.copy(this.currentPointerPosition);
        
      } else if (this.isZooming) {
        // Zoom con 2 dedos (dedos separados)
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        
        if (this.previousTouchDistance > 0) {
          const zoomDelta = (currentDistance - this.previousTouchDistance) * 0.01;
          this.applyCameraZoom(zoomDelta);
        }
        this.previousTouchDistance = currentDistance;
      }
    }
  }
  
  private onTouchEnd(e: TouchEvent): void {
    if (e.touches.length === 0) {
      this.isRotating = false;
      this.isPanning = false;
      this.isZooming = false;
      this.previousTouchDistance = 0;
    } else if (e.touches.length === 1) {
      // Cambiar a rotación si queda 1 dedo
      this.isPanning = false;
      this.isZooming = false;
      this.isRotating = true;
      const pos = this.getPointerPosition(e);
      this.startPointerPosition.set(pos.x, pos.y);
      this.previousTouchDistance = 0;
    }
  }
  
  private handleModelRotation(): void {
    const delta = new THREE.Vector2().subVectors(
      this.currentPointerPosition,
      this.startPointerPosition
    );
    
    // Apply rotation to the model
    this.model!.rotation.y += delta.x * 0.005; // Horizontal rotation
    this.model!.rotation.x += delta.y * 0.005; // Vertical rotation
    
    // Limiting vertical rotation to avoid flipping
    this.model!.rotation.x = Math.max(
      -Math.PI/2, 
      Math.min(Math.PI/2, this.model!.rotation.x)
    );
  }
  
  private handleModelPan(): void {
    const delta = new THREE.Vector2().subVectors(
      this.currentPointerPosition,
      this.startPointerPosition
    );
    
    // Convert 2D to 3D movement (adjust as need)
    const panSpeed = 0.01;
    const panDirection = new THREE.Vector3(
      delta.x * panSpeed,
      -delta.y * panSpeed,
      0
    );
    
    // Apply displacement to the model
    this.model!.position.add(panDirection);
    
    // Optional: Limit displacement
    this.model!.position.x = THREE.MathUtils.clamp(
      this.model!.position.x, 
      -10, 
      10
    );
    this.model!.position.y = THREE.MathUtils.clamp(
      this.model!.position.y, 
      -10, 
      10
    );
  }
  
  public dispose(): void {
    // Remove all events listeners
    this.domElement.removeEventListener('mousedown', this.onPointerDown);
    this.domElement.removeEventListener('mousemove', this.onPointerMove);
    this.domElement.removeEventListener('mouseup', this.onPointerUp);
    this.domElement.removeEventListener('mouseleave', this.onPointerUp);
    
    this.domElement.removeEventListener('touchstart', this.onTouchStart);
    this.domElement.removeEventListener('touchmove', this.onTouchMove);
    this.domElement.removeEventListener('touchend', this.onTouchEnd);
    this.domElement.removeEventListener('touchcancel', this.onTouchEnd);

    this.domElement.removeEventListener('wheel', this.handleWheelZoom);
    
    super.dispose();
  }
}