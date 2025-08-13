import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { THREE } from '..';
export class OrbitControlsManager {
    constructor(camera, rendererDomElement) {
        this.controls = null;
        this.enableRotate = true;
        this.enablePan = true;
        this.enableZoom = true;
        this.isRotating = false;
        this.isPanning = false;
        this.startMousePosition = new THREE.Vector2();
        this.currentMousePosition = new THREE.Vector2();
        this.startPointerPosition = new THREE.Vector2();
        this.currentPointerPosition = new THREE.Vector2();
        this.previousTouchDistance = 0;
        this.camera = camera;
        this.domElement = rendererDomElement;
        // Initial configuration
        this.enableRotate = true;
        this.enablePan = true;
        this.enableZoom = true;
        // State variables
        this.isRotating = false;
        this.isPanning = false;
        this.startMousePosition = new THREE.Vector2();
        this.currentMousePosition = new THREE.Vector2();
        // Configure only OrbitControls for Zoom
        this.controls = new OrbitControls(camera, rendererDomElement);
        this.controls.enableRotate = false;
        this.controls.enablePan = false;
        this.controls.enableZoom = this.enableZoom;
    }
    setModel(model) {
        this.model = model;
        // Events setup
        this.setupEvents();
        model.updateWorldMatrix(true, true);
    }
    setupEvents() {
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
    }
    /**
     * Optionally, you can use this method to get the pointer position
     * in a unified way for both mouse and touch events.
     * @param {MouseEvent | TouchEvent} event - The event object from mouse or touch events.
     * @returns {{ x: number, y: number }} - The pointer position
     * @description
     * This method extracts the pointer position from either a MouseEvent or TouchEvent.
     * It returns an object with x and y coordinates based on the event type.
     * If the event is a MouseEvent, it uses clientX and clientY.
     * If it's a TouchEvent, it uses the first touch's clientX and clientY.
     * If no valid position can be determined, it returns { x: 0, y: 0 }.
     * @example
     * const pos = this.getPointerPosition(event);
     * console.log(`Pointer position: x=${pos.x}, y=${pos.y}`);
     * @returns {{ x: number, y: number }} - The pointer position in the format { x: number, y: number }
     * @memberof OrbitControlsManager
     * @private
     */
    getPointerPosition(event) {
        // Verify if the event is a touch event or mouse event
        if ('touches' in event && event.touches.length > 0) {
            return {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
        else if ('clientX' in event) {
            return {
                x: event.clientX,
                y: event.clientY
            };
        }
        return { x: 0, y: 0 };
    }
    /**
     * Handles pointer down events for mouse and touch.
     * For mouse events, it checks the button pressed and sets the appropriate state.
     * For touch events, it does nothing as touch handling is managed in onTouchStart.
     * @param {MouseEvent | TouchEvent} e - The event object from mouse or touch events.
     * @description
     * This method is triggered when the user presses down on the mouse button or touches the screen.
     * It checks if the left mouse button is pressed (button 0) and if rotation is enabled,
     * it sets the `isRotating` state to true and records the starting pointer position.
     * If the right mouse button is pressed (button 2) and panning is enabled,
     * it sets the `isPanning` state to true and records the starting pointer position.
     * For touch events, it does not perform any action as touch handling is managed in `onTouchStart`.
     * This method prevents the default action of the event to avoid unwanted
     * behaviors like text selection or context menu display.
     * @example
     * // Example usage in a mouse event handler
     * document.addEventListener('mousedown', (e) => {
     *   orbitControlsManager.onPointerDown(e);
     * });
     * @memberof OrbitControlsManager
     * @private
     * @returns {void}
     */
    onPointerDown(e) {
        // For touch events, we handle in onTouchStart
        if ('touches' in e) {
            this.onTouchStart(e);
            return;
        }
        if (e.button === 0 && this.enableRotate) { // Left button
            this.isRotating = true;
            const pos = this.getPointerPosition(e);
            this.startPointerPosition.set(pos.x, pos.y);
            e.preventDefault();
        }
        else if (e.button === 2 && this.enablePan) { // Right button
            this.isPanning = true;
            const pos = this.getPointerPosition(e);
            this.startPointerPosition.set(pos.x, pos.y);
            e.preventDefault();
        }
    }
    /**
     * Handles pointer move events for mouse and touch.
     * For mouse events, it updates the current pointer position and handles rotation or panning.
     * For touch events, it does nothing as touch handling is managed in onTouchMove.
     * @param {MouseEvent | TouchEvent} e - The event object from mouse or touch events.
     * @description
     * This method is triggered when the user moves the mouse or touches the screen.
     * It retrieves the current pointer position and checks if the user is rotating or panning.
     * If the user is rotating, it calls `handleModelRotation` to apply the rotation
     * to the model based on the difference between the current and starting pointer positions.
     * If the user is panning, it calls `handleModelPan` to apply the pan
     * to the model based on the difference between the current and starting pointer positions.
     * It also prevents the default action of the event to avoid unwanted behaviors like text selection.
     * This method updates the starting pointer position to the current position after handling the move.
     * @example
     * // Example usage in a mouse event handler
     * document.addEventListener('mousemove', (e) => {
     *   orbitControlsManager.onPointerMove(e);
     * });
     * @memberof OrbitControlsManager
     * @private
     * @returns {void}
     */
    onPointerMove(e) {
        // For touch events, we handle in onTouchMove
        if ('touches' in e) {
            this.onTouchMove(e);
            return;
        }
        const pos = this.getPointerPosition(e);
        this.currentPointerPosition.set(pos.x, pos.y);
        if (this.isRotating) {
            this.handleModelRotation();
            e.preventDefault();
        }
        else if (this.isPanning) {
            this.handleModelPan();
            e.preventDefault();
        }
        this.startPointerPosition.copy(this.currentPointerPosition);
    }
    /**
     * Handles pointer up events for mouse and touch.
     * For mouse events, it resets the rotation and panning states.
     * For touch events, it does nothing as touch handling is managed in onTouchEnd.
     * @description
     * This method is triggered when the user releases the mouse button or lifts their finger from the screen.
     * It checks if the event is a mouse event and resets the `isRotating` and `isPanning` states to false,
     * indicating that the user has stopped interacting with the model.
     * For touch events, it does nothing as touch handling is managed in `onTouchEnd`.
     * This method prevents the default action of the event to avoid unwanted behaviors like
     * text selection or context menu display.
     * @example
     * // Example usage in a mouse event handler
     * document.addEventListener('mouseup', (e) => {
     *   orbitControlsManager.onPointerUp();
     * });
     * @memberof OrbitControlsManager
     * @private
     * @returns {void}
     */
    onPointerUp() {
        this.isRotating = false;
        this.isPanning = false;
    }
    /**
     * Handles touch start events.
     * It checks the number of touches to determine if the user is rotating or panning.
     * For one touch, it enables rotation; for two touches, it enables panning and zooming.
     * @param {TouchEvent} e - The touch event object.
     * @description
     * This method is triggered when the user touches the screen.
     * It checks the number of touches:
     * - If there is one touch, it enables rotation by setting `isRotating`
     *   to true and records the starting pointer position.
     * - If there are two touches, it enables panning by setting `isPanning`
     *   to true, calculates the average position between the two touches,
     *   and records the starting pointer position.
     *   It also calculates the initial distance between the two touches
     *   for possible zoom handling.
     * This method prevents the default action of the event to avoid unwanted behaviors
     * like scrolling or text selection.
     * @example
     * // Example usage in a touch event handler
     * document.addEventListener('touchstart', (e) => {
     *   orbitControlsManager.onTouchStart(e);
     * });
     * @memberof OrbitControlsManager
     * @private
     * @returns {void}
     */
    onTouchStart(e) {
        e.preventDefault();
        if (e.touches.length === 1) {
            if (this.enableRotate) {
                this.isRotating = true;
                const pos = this.getPointerPosition(e);
                this.startPointerPosition.set(pos.x, pos.y);
            }
        }
        else if (e.touches.length === 2) {
            if (this.enablePan) {
                this.isPanning = true;
                // Calculate average position between the two fingers
                const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                this.startPointerPosition.set(midX, midY);
                // Calculate initial distance between the two touches for pinch zoom
                this.previousTouchDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            }
        }
    }
    /**
     * Handles touch move events.
     * It checks the number of touches to determine if the user is rotating or panning.
     * For one touch, it updates the rotation; for two touches, it updates the pan and zoom.
     * @param {TouchEvent} e - The touch event object.
     * @description
     * This method is triggered when the user moves their finger(s) on the screen.
     * It checks the number of touches:
     * - If there is one touch, it updates the current pointer position,
     *   calculates the delta from the starting pointer position,
     *   and calls `handleModelRotation` to apply the rotation to the model.
     * - If there are two touches, it calculates the average position between the two touches,
     *   updates the current pointer position, and calls `handleModelPan` to apply the pan to the model.
     *   It also calculates the current distance between the two touches
     *   and calls `handleZoom` to apply zoom based on the difference from the previous distance.
     * This method prevents the default action of the event to avoid unwanted behaviors
     * like scrolling or text selection.
     * @example
     * // Example usage in a touch event handler
     * document.addEventListener('touchmove', (e) => {
     *   orbitControlsManager.onTouchMove(e);
     * });
     * @memberof OrbitControlsManager
     * @private
     * @returns {void}
     */
    onTouchMove(e) {
        e.preventDefault();
        if (e.touches.length === 1 && this.isRotating) {
            const pos = this.getPointerPosition(e);
            this.currentPointerPosition.set(pos.x, pos.y);
            this.handleModelRotation();
            this.startPointerPosition.copy(this.currentPointerPosition);
        }
        else if (e.touches.length === 2 && this.isPanning) {
            // Calculate average position between the two touches
            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            this.currentPointerPosition.set(midX, midY);
            this.handleModelPan();
            this.startPointerPosition.copy(this.currentPointerPosition);
            // Handle zoom with pinch if you are enabled
            if (this.enableZoom) {
                const currentDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
                const zoomDelta = currentDistance - this.previousTouchDistance;
                this.handleZoom(zoomDelta * 0.01);
                this.previousTouchDistance = currentDistance;
            }
        }
    }
    /**
     * Handles touch end events.
     * It resets the rotation and panning states when all touches are lifted.
     * If one touch remains, it switches to rotation mode.
     * @param {TouchEvent} e - The touch event object.
     * @description
     * This method is triggered when the user lifts their finger(s) from the screen.
     * It checks the number of touches remaining:
     * - If there are no touches left, it resets both `isRotating` and `isPanning` to false.
     * - If there is one touch remaining, it switches to rotation mode by setting `isRotating` to true,
     *   resets `isPanning` to false, and records the current pointer position
     *   as the starting pointer position.
     * This method prevents the default action of the event to avoid unwanted behaviors
     * like scrolling or text selection.
     * @example
     * // Example usage in a touch event handler
     * document.addEventListener('touchend', (e) => {
     *   orbitControlsManager.onTouchEnd(e);
     * });
     * @memberof OrbitControlsManager
     * @private
     * @returns {void}
     */
    onTouchEnd(e) {
        if (e.touches.length === 0) {
            this.isRotating = false;
            this.isPanning = false;
        }
        else if (e.touches.length === 1) {
            // Change to rotation mode if one touch remains
            this.isPanning = false;
            this.isRotating = true;
            const pos = this.getPointerPosition(e);
            this.startPointerPosition.set(pos.x, pos.y);
        }
    }
    /**
     * Handles model rotation based on pointer movement.
     * It calculates the delta between the current and starting pointer positions
     * and applies the rotation to the model.
     * It also limits the vertical rotation to avoid flipping the model.
     * @description
     * This method is called when the user moves the mouse or touches the screen while rotating.
     * It calculates the difference (delta) between the current pointer position and the starting pointer position
     * and applies this delta to the model's rotation.
     * The rotation is applied around the y-axis for horizontal movement and the x-axis for vertical movement.
     * To prevent the model from flipping over, it limits the vertical rotation (x-axis)
     * to a range between -π/2 and π/2 radians.
     * This ensures that the model can be rotated up and down without going beyond a certain point
     * that would cause it to flip over.
     * @example
     * // Example usage in a mouse event handler
     * document.addEventListener('mousemove', (e) => {
     *   orbitControlsManager.handleModelRotation();
     * });
     * @memberof OrbitControlsManager
     * @private
     * @returns {void}
     */
    handleModelRotation() {
        const delta = new THREE.Vector2().subVectors(this.currentPointerPosition, this.startPointerPosition);
        // Apply rotation to the model
        this.model.rotation.y += delta.x * 0.005; // Horizontal rotation
        this.model.rotation.x += delta.y * 0.005; // Vertical rotation
        // Limiting vertical rotation to avoid flipping
        this.model.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.model.rotation.x));
    }
    /**
     * Handles model panning based on pointer movement.
     * It calculates the delta between the current and starting pointer positions
     * and applies the pan to the model's position.
     * It also limits the pan to a specific range to prevent excessive movement.
     * @description
     * This method is called when the user moves the mouse or touches the screen while panning.
     * It calculates the difference (delta) between the current pointer position and the starting pointer position
     * and applies this delta to the model's position.
     * The pan is applied in the x and y directions based on the delta values.
     * It also limits the pan to a specific range (e.g., -10 to 10 for both x and y axes)
     * to prevent the model from moving too far away from the center of the scene.
     * This ensures that the model remains within a reasonable area and does not go out of view.
     * @example
     * // Example usage in a mouse event handler
     * document.addEventListener('mousemove', (e) => {
     *   orbitControlsManager.handleModelPan();
     * });
     * @memberof OrbitControlsManager
     * @private
     * @returns {void}
     */
    handleModelPan() {
        const delta = new THREE.Vector2().subVectors(this.currentPointerPosition, this.startPointerPosition);
        // Convert 2D to 3D movement (adjust as need)
        const panSpeed = 0.01;
        const panDirection = new THREE.Vector3(delta.x * panSpeed, -delta.y * panSpeed, 0);
        // Apply displacement to the model
        this.model.position.add(panDirection);
        // Optional: Limit displacement
        this.model.position.x = THREE.MathUtils.clamp(this.model.position.x, -10, 10);
        this.model.position.y = THREE.MathUtils.clamp(this.model.position.y, -10, 10);
    }
    /**
     * Handles zooming the model based on mouse wheel or touch pinch.
     * It scales the model based on the delta value from the wheel or pinch gesture.
     * It also limits the scale to a specific range to prevent excessive zooming in or out.
     * @param {number} delta - The delta value from the mouse wheel or pinch gesture
     * @description
     * This method is called when the user scrolls the mouse wheel or performs a pinch gesture
     * to zoom in or out on the model.
     * It calculates a scale factor based on the delta value, which represents the amount of zoom
     * (positive for zooming in, negative for zooming out).
     * The model's scale is then multiplied by this scale factor to apply the zoom effect.
     * The scale is clamped to a minimum and maximum value to prevent the model from becoming
     * too small or too large, which could make it difficult to view or interact with.
     * This ensures that the model remains at a reasonable size within the scene.
     * @example
     * // Example usage in a mouse wheel event handler
     * document.addEventListener('wheel', (e) => {
     *   orbitControlsManager.handleZoom(e.deltaY * 0.001);
     * });
     * @memberof OrbitControlsManager
     * @private
     * @returns {void}
     */
    handleZoom(delta) {
        // Climb the model instead of moving the camera
        const scaleFactor = 1 + delta;
        this.model.scale.multiplyScalar(scaleFactor);
        // Scalar Limiting
        const minScale = 0.1;
        const maxScale = 10;
        this.model.scale.clampScalar(minScale, maxScale);
    }
    /**
     * Updates the orbit controls.
     * This method is called to update the orbit controls state.
     * It ensures that the controls are updated based on the current camera position and model state.
     * @description
     * This method is responsible for updating the orbit controls.
     * It checks if the orbit controls are initialized and calls their update method.
     * This is typically called in the animation loop to ensure that the controls reflect any changes
     * made to the camera or model during the rendering process.
     * It allows the controls to respond to user input and update the camera position accordingly.
     * @example
     * // Example usage in the animation loop
     * function animate() {
     *   requestAnimationFrame(animate);
     *   orbitControlsManager.update();
     *   renderer.render(scene, camera);
     * }
     * animate();
     * @memberof OrbitControlsManager
     * @public
     * @returns {void}
     */
    update() {
        if (this.controls) {
            this.controls.update();
        }
    }
    /**
     * Disposes of the orbit controls manager.
     * This method removes all event listeners and cleans up the orbit controls.
     * It ensures that there are no memory leaks or lingering event listeners after the controls are no longer needed.
     * @description
     * This method is called to clean up the orbit controls manager when it is no longer needed.
     * It removes all event listeners that were added for mouse and touch events,
     * ensuring that there are no memory leaks or lingering event listeners.
     * It also disposes of the orbit controls if they were initialized.
     * This is important for maintaining performance and preventing unexpected behavior
     * when the controls are no longer in use.
     * @example
     * // Example usage when the controls are no longer needed
     * orbitControlsManager.dispose();
     * @memberof OrbitControlsManager
     * @public
     * @returns {void}
     */
    dispose() {
        // Remove all events listeners
        this.domElement.removeEventListener('mousedown', this.onPointerDown);
        this.domElement.removeEventListener('mousemove', this.onPointerMove);
        this.domElement.removeEventListener('mouseup', this.onPointerUp);
        this.domElement.removeEventListener('mouseleave', this.onPointerUp);
        this.domElement.removeEventListener('touchstart', this.onTouchStart);
        this.domElement.removeEventListener('touchmove', this.onTouchMove);
        this.domElement.removeEventListener('touchend', this.onTouchEnd);
        this.domElement.removeEventListener('touchcancel', this.onTouchEnd);
        if (this.controls) {
            this.controls.dispose();
        }
    }
}
//# sourceMappingURL=OrbitControlsManager.js.map