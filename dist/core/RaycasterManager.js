// RaycasterManager.ts
import { THREE } from '..';
import { EventDispatcher } from 'three';
export class RaycasterManager extends EventDispatcher {
    constructor(domElement) {
        super();
        // Estado de control
        this.isEnabled = false;
        this.isPointerDown = false;
        this.lastHoverObject = null;
        this.isTouchDevice = false;
        this.isDragging = false;
        this.dragStartPosition = new THREE.Vector2();
        this.currentDragObject = null;
        // Para evitar dobles clics en dispositivos táctiles
        this.lastTapTime = 0;
        this.tapDelay = 300; // ms
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.domElement = domElement;
        this.isTouchDevice = this.detectTouchDevice();
        // Bind events
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
    }
    setModel(model) {
        this.model = model;
    }
    detectTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    initialize(scene, camera) {
        this.scene = scene;
        this.camera = camera;
    }
    setEnabled(enabled) {
        if (this.isEnabled === enabled) {
            return;
        }
        this.isEnabled = enabled;
        if (enabled) {
            this.attachEvents();
        }
        else {
            this.detachEvents();
            this.clearHoverState();
        }
    }
    attachEvents() {
        // Eventos para dispositivos no táctiles
        this.domElement.addEventListener('mousemove', this.onPointerMove, { passive: true });
        this.domElement.addEventListener('mousedown', this.onPointerDown, { passive: true });
        this.domElement.addEventListener('mouseup', this.onPointerUp, { passive: true });
        this.domElement.addEventListener('click', this.onClick, { passive: true });
        // Eventos para dispositivos táctiles
        this.domElement.addEventListener('touchstart', this.onTouchStart, { passive: false });
        this.domElement.addEventListener('touchend', this.onTouchEnd, { passive: false });
        this.domElement.addEventListener('touchmove', this.onTouchMove, { passive: false });
        // Prevenir menú contextual
        this.domElement.addEventListener('contextmenu', this.onContextMenu);
        // Estilo del cursor para indicar interactividad
        if (!this.isTouchDevice) {
            this.domElement.style.cursor = 'pointer';
        }
    }
    detachEvents() {
        // Remover eventos de mouse
        this.domElement.removeEventListener('mousemove', this.onPointerMove);
        this.domElement.removeEventListener('mousedown', this.onPointerDown);
        this.domElement.removeEventListener('mouseup', this.onPointerUp);
        this.domElement.removeEventListener('click', this.onClick);
        // Remover eventos táctiles
        this.domElement.removeEventListener('touchstart', this.onTouchStart);
        this.domElement.removeEventListener('touchend', this.onTouchEnd);
        this.domElement.removeEventListener('touchmove', this.onTouchMove);
        // Remover contexto
        this.domElement.removeEventListener('contextmenu', this.onContextMenu);
        // Restaurar cursor por defecto
        this.domElement.style.cursor = 'default';
    }
    updatePointerPosition(event) {
        const rect = this.domElement.getBoundingClientRect();
        let clientX, clientY;
        if ('touches' in event && event.touches.length > 0) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }
        else if ('clientX' in event) {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        else {
            return;
        }
        this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }
    // ========== EVENTOS PARA DISPOSITIVOS NO TÁCTILES ==========
    onPointerMove(event) {
        if (!this.isEnabled || !this.scene || !this.camera || this.isTouchDevice) {
            return;
        }
        this.updatePointerPosition(event);
        // Si estamos arrastrando, enviar datos del movimiento
        if (this.isDragging && this.currentDragObject) {
            const currentPosition = new THREE.Vector2(event.clientX, event.clientY);
            const delta = new THREE.Vector2().subVectors(currentPosition, this.dragStartPosition);
            // Disparar evento de arrastre con toda la información necesaria
            this.dispatchEvent({
                type: 'objectdrag',
                object: this.currentDragObject,
                startPosition: this.dragStartPosition.clone(),
                currentPosition: currentPosition,
                delta: delta,
                normalizedDelta: new THREE.Vector2(delta.x / this.domElement.clientWidth, delta.y / this.domElement.clientHeight),
                originalEvent: event
            });
            // Actualizar posición de inicio para el próximo movimiento
            this.dragStartPosition.copy(currentPosition);
        }
        else {
            // Comportamiento normal de hover
            this.raycast();
        }
    }
    onPointerDown(event) {
        if (!this.isEnabled || this.isTouchDevice) {
            return;
        }
        this.isPointerDown = true;
        this.updatePointerPosition(event);
        const hits = this.performRaycast();
        if (hits.length > 0) {
            this.isDragging = true;
            this.currentDragObject = hits[0].object;
            this.dragStartPosition.set(event.clientX, event.clientY);
            // Disparar evento de inicio de arrastre con posición inicial
            this.dispatchEvent({
                type: 'objectdragstart',
                object: this.currentDragObject,
                startPosition: this.dragStartPosition.clone(),
                originalEvent: event
            });
        }
        event.preventDefault();
    }
    onPointerUp(event) {
        if (!this.isEnabled || this.isTouchDevice) {
            return;
        }
        if (this.isDragging && this.currentDragObject) {
            const finalPosition = new THREE.Vector2(event.clientX, event.clientY);
            // Disparar evento de fin de arrastre
            this.dispatchEvent({
                type: 'objectdragend',
                object: this.currentDragObject,
                startPosition: this.dragStartPosition.clone(),
                endPosition: finalPosition,
                totalDelta: new THREE.Vector2().subVectors(finalPosition, this.dragStartPosition),
                originalEvent: event
            });
        }
        this.isDragging = false;
        this.currentDragObject = null;
        this.isPointerDown = false;
    }
    onClick(event) {
        if (!this.isEnabled || !this.scene || !this.camera || this.isTouchDevice) {
            return;
        }
        this.updatePointerPosition(event);
        const hits = this.performRaycast();
        if (hits.length > 0) {
            this.dispatchEvent({
                type: 'objectclick',
                object: hits[0].object,
                point: hits[0].point,
                distance: hits[0].distance,
                originalEvent: event
            });
        }
    }
    // ========== EVENTOS PARA DISPOSITIVOS TÁCTILES ==========
    onTouchStart(event) {
        if (!this.isEnabled || !this.scene || !this.camera || !this.isTouchDevice) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (event.touches.length === 1) {
            this.isPointerDown = true;
            this.updatePointerPosition(event);
            const hits = this.performRaycast();
            if (hits.length > 0) {
                this.isDragging = true;
                this.currentDragObject = hits[0].object;
                this.dragStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
                this.dispatchEvent({
                    type: 'objectdragstart',
                    object: this.currentDragObject,
                    startPosition: this.dragStartPosition.clone(),
                    originalEvent: event
                });
            }
        }
    }
    onTouchEnd(event) {
        if (!this.isEnabled || !this.isTouchDevice) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (event.touches.length === 0 && this.isDragging && this.currentDragObject) {
            const finalPosition = new THREE.Vector2(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            this.dispatchEvent({
                type: 'objectdragend',
                object: this.currentDragObject,
                startPosition: this.dragStartPosition.clone(),
                endPosition: finalPosition,
                totalDelta: new THREE.Vector2().subVectors(finalPosition, this.dragStartPosition),
                originalEvent: event
            });
        }
        this.isDragging = false;
        this.currentDragObject = null;
        this.isPointerDown = false;
        if (event.touches.length === 0 && this.isPointerDown) {
            this.isPointerDown = false;
            this.handleTap(event);
        }
    }
    onTouchMove(event) {
        if (!this.isEnabled || !this.scene || !this.camera || !this.isTouchDevice) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (event.touches.length === 1 && this.isDragging && this.currentDragObject) {
            const currentPosition = new THREE.Vector2(event.touches[0].clientX, event.touches[0].clientY);
            const delta = new THREE.Vector2().subVectors(currentPosition, this.dragStartPosition);
            this.dispatchEvent({
                type: 'objectdrag',
                object: this.currentDragObject,
                startPosition: this.dragStartPosition.clone(),
                currentPosition: currentPosition,
                delta: delta,
                normalizedDelta: new THREE.Vector2(delta.x / this.domElement.clientWidth, delta.y / this.domElement.clientHeight),
                originalEvent: event
            });
            this.dragStartPosition.copy(currentPosition);
        }
        else if (event.touches.length === 1) {
            this.updatePointerPosition(event);
            this.raycast();
        }
    }
    handleTap(event) {
        if (!this.scene || !this.camera) {
            return;
        }
        const currentTime = new Date().getTime();
        const tapLength = currentTime - this.lastTapTime;
        // Prevenir dobles taps rápidos
        if (tapLength < this.tapDelay && tapLength > 0) {
            return;
        }
        this.lastTapTime = currentTime;
        const hits = this.performRaycast();
        if (hits.length > 0) {
            this.dispatchEvent({
                type: 'objectclick',
                object: hits[0].object,
                point: hits[0].point,
                distance: hits[0].distance,
                originalEvent: event
            });
            // Para dispositivos táctiles, también podemos considerar esto como hover
            this.dispatchEvent({
                type: 'objecthoverin',
                object: hits[0].object,
                point: hits[0].point,
                distance: hits[0].distance,
                originalEvent: event
            });
        }
    }
    onContextMenu(event) {
        if (!this.isEnabled) {
            return;
        }
        event.preventDefault();
    }
    // ========== LÓGICA COMPARTIDA ==========
    raycast() {
        if (!this.scene || !this.camera) {
            return;
        }
        const hits = this.performRaycast();
        const currentHoverObject = hits.length > 0 ? hits[0].object : null;
        // Manejar eventos de hover
        if (currentHoverObject !== this.lastHoverObject) {
            // Disparar evento de hover out para el objeto anterior
            if (this.lastHoverObject) {
                this.dispatchEvent({
                    type: 'objecthoverout',
                    object: this.lastHoverObject
                });
            }
            // Disparar evento de hover in para el nuevo objeto
            if (currentHoverObject) {
                this.dispatchEvent({
                    type: 'objecthoverin',
                    object: currentHoverObject,
                    point: hits[0].point,
                    distance: hits[0].distance
                });
            }
            this.lastHoverObject = currentHoverObject;
        }
        // Disparar evento de hover move si hay un objeto bajo el cursor/puntero
        if (currentHoverObject) {
            this.dispatchEvent({
                type: 'objecthovermove',
                object: currentHoverObject,
                point: hits[0].point,
                distance: hits[0].distance
            });
        }
    }
    performRaycast() {
        if (!this.scene || !this.camera || !this.model) {
            return [];
        }
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const interactableObjects = this.model.children.filter(obj => {
            return obj.userData?.interactable !== false;
        });
        const intersects = this.raycaster.intersectObjects(interactableObjects, true);
        return intersects.map(intersect => ({
            object: intersect.object,
            point: intersect.point,
            distance: intersect.distance,
            face: intersect.face,
            faceIndex: intersect.faceIndex
        }));
    }
    clearHoverState() {
        if (this.lastHoverObject) {
            this.dispatchEvent({
                type: 'objecthoverout',
                object: this.lastHoverObject
            });
            this.lastHoverObject = null;
        }
    }
    // Método público para forzar un raycast en una posición específica
    raycastAtPosition(normalizedX, normalizedY) {
        if (!this.scene || !this.camera) {
            return [];
        }
        this.pointer.x = normalizedX;
        this.pointer.y = normalizedY;
        return this.performRaycast();
    }
    dispose() {
        this.setEnabled(false);
        this.scene = undefined;
        this.camera = undefined;
        this.lastHoverObject = null;
    }
}
//# sourceMappingURL=RaycasterManager.js.map