// Cálculo del progreso espacial (onda de izquierda a derecha)
float normX = (vPosX - uMinX) / (uMaxX - uMinX);
float threshold = uProgress * 1.2 - 0.1; 
float effect = smoothstep(threshold - 0.15, threshold, normX);

// Color original del material (con textura y propiedades físicas intactas)
vec3 originalColor = diffuseColor.rgb;
float originalAlpha = diffuseColor.a;

vec3 finalColor = originalColor;
float finalAlpha = originalAlpha;

// Detectar si estamos en modo textura puro (sin transición activa)
bool isTextureMode = uUseTexture > 0.5;
bool isTransitioning = abs(uTransitionType) > 0.1 || (uProgress > 0.01 && uProgress < 0.99);

// ============================================================================
// LÓGICA DE TRANSICIÓN
// ============================================================================

if (!isTransitioning && isTextureMode) {
    // ------------------------------------------------------------------------
    // MODO TEXTURA PURO: No tocamos nada, preservamos cristal/transmisión original
    // ------------------------------------------------------------------------
    finalColor = originalColor;
    finalAlpha = originalAlpha;
    
} else if (uTransitionType > 0.5) {
    // ------------------------------------------------------------------------
    // HACIA TEXTURA (Solid/Wire → Textured)
    // ------------------------------------------------------------------------
    vec3 oldSolid = mix(uColorOld, uColorNew, effect);
    vec3 oldWire = mix(uWireColorOld, uWireColorNew, effect);
    
    float oldWireVal = getWireframe(vUv);
    vec3 oldWireLook = mix(oldSolid, oldWire, clamp(oldWireVal, 0.0, 1.0));
    
    // Mezclamos desde el look anterior hacia el original (que incluye transmisión)
    finalColor = mix(oldWireLook, originalColor, effect);
    finalAlpha = mix(0.95, originalAlpha, effect);
    
} else if (uTransitionType < -0.5) {
    // ------------------------------------------------------------------------
    // DESDE TEXTURA (Textured → Solid/Wire) 
    // ------------------------------------------------------------------------
    // El color destino es FIJO (uColorNew), no interpolado con Old
    vec3 targetLook;
    
    if (uIsWireMode > 0.5) {
        float w = getWireframe(vUv);
        targetLook = mix(uColorNew, uWireColorNew, clamp(w, 0.0, 1.0));
    } else {
        targetLook = uColorNew;
    }
    
    // Mezclamos desde el color original (con transmisión) hacia el sólido
    finalColor = mix(originalColor, targetLook, effect);
    
    // Interpolamos alpha: desde el original (transparente) hacia sólido
    float targetAlpha = (uIsWireMode > 0.5) ? 0.9 : 1.0;
    finalAlpha = mix(originalAlpha, targetAlpha, effect);
    
} else {
    // ------------------------------------------------------------------------
    // ENTRE SOLIDOS/WIRES (Solid→Solid o Wire→Wire)
    // ------------------------------------------------------------------------
    if (uIsWireMode > 0.5) {
        vec3 solidMix = mix(uColorOld, uColorNew, effect);
        vec3 wireMix = mix(uWireColorOld, uWireColorNew, effect);
        float w = getWireframe(vUv);
        finalColor = mix(solidMix, wireMix, clamp(w, 0.0, 1.0));
        finalAlpha = 0.9;
    } else {
        finalColor = mix(uColorOld, uColorNew, effect);
        finalAlpha = 1.0;
    }
}

// Aplicar resultado
diffuseColor.rgb = finalColor;
diffuseColor.a = finalAlpha;