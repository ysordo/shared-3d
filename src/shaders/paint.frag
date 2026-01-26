precision highp float;

float normX = (vPosX - uMinX) / (uMaxX - uMinX);
float threshold = uProgress * 1.1; 
float effect = smoothstep(threshold - 0.1, threshold, normX);

vec3 targetRGB;
float targetAlpha = 1.0;

if (uIsWireMode > 0.5) {
    float wire = getWireframe(vUv);
    
    // El fondo es el color que ya estaba transicionando (uColorOld → uColorNew)
    vec3 background = mix(uColorNew, uColorOld, effect);
    
    // La línea transiciona de forma independiente
    vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);
    
    // Combinamos: donde wire > 0 → usamos lineColor, donde wire ≈ 0 → background
    targetRGB = mix(background, lineColor, clamp(wire, 0.0, 1.0));
    
    targetAlpha = 0.95;  // o uWireAlpha si quieres hacerlo configurable después
} else {
    // Modo sólido: sin cambios
    targetRGB = mix(uColorNew, uColorOld, effect);
}

// LÓGICA DE SALIDA (sin cambios)
if (uUseTexture > 0.5) {
    // MODO TEXTURA: respetamos color y transparencia original
} else {
    diffuseColor.rgb = targetRGB;
    diffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);
}