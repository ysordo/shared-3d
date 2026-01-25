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

// LÓGICA DE SALIDA
if (uUseTexture > 0.5) {
    // MODO TEXTURA: Respetamos color y transparencia original del mapa
    // NO tocamos diffuseColor.a para que el cristal funcione
} else {
    // MODO SÓLIDO / WIREFRAME
    diffuseColor.rgb = targetRGB;
    
    // Si uGlassOpacity es 1.0, mantenemos el alpha original (cristal)
    // Si es 0.0, usamos targetAlpha (1.0 o 0.95) para hacerlo bloque sólido
    diffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);
}
