import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { THREE } from '..';
export declare class OrbitControlsManager {
    private model?;
    private camera;
    private domElement;
    controls: OrbitControls | null;
    enableRotate: boolean;
    enablePan: boolean;
    enableZoom: boolean;
    private isRotating;
    private isPanning;
    private startMousePosition;
    private currentMousePosition;
    private startPointerPosition;
    private currentPointerPosition;
    private previousTouchDistance;
    constructor(camera: THREE.Camera, rendererDomElement: HTMLElement);
    setModel(model: THREE.Object3D): void;
    private setupEvents;
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
    private getPointerPosition;
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
    private onPointerDown;
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
    private onPointerMove;
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
    private onPointerUp;
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
    private onTouchStart;
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
    private onTouchMove;
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
    private onTouchEnd;
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
    private handleModelRotation;
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
    private handleModelPan;
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
    private handleZoom;
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
    update(): void;
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
    dispose(): void;
}
//# sourceMappingURL=OrbitControlsManager.d.ts.map