float normX = (vPosX - uMinX) / (uMaxX - uMinX);
float threshold = uProgress * 1.1; 
float effect = smoothstep(threshold - 0.1, threshold, normX);

// Color objetivo del pintado
vec3 targetRGB;
float targetAlpha = 1.0;

if (uIsWireMode > 0.5) {
    float wire = getWireframe(vUv);
    targetRGB = mix(vec3(0.53), uWireColor, clamp(wire, 0.0, 1.0));
    targetAlpha = 0.95;
} else {
    targetRGB = mix(uColorNew, uColorOld, effect);
}

// Si uUseTexture es 1.0, diffuseColor.rgb contiene la textura original de Three.js
// Si uUseTexture es 0.0, ignoramos la textura y usamos nuestro targetRGB
if (uUseTexture > 0.5) {
    // Aquí puedes decidir si quieres que la textura también barra o sea instantánea
    // Para respetar el modelo original 100%:
    diffuseColor.a = 1.0;
} else {
    diffuseColor.rgb = targetRGB;
    diffuseColor.a = targetAlpha;
}
