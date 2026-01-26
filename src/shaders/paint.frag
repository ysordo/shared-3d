// Cálculo del progreso espacial (onda de izquierda a derecha)
float normX = (vPosX - uMinX) / (uMaxX - uMinX);
float threshold = uProgress * 1.2 - 0.1; 

// CORREGIDO: 1.0 - smoothstep para que vaya de izquierda (1) a derecha (0)
// Izquierda (x pequeño) = New (effect=1), Derecha (x grande) = Old (effect=0)
float effect = 1.0 - smoothstep(threshold - 0.15, threshold, normX);

// Color original del material (con textura y propiedades físicas intactas)
vec3 originalColor = diffuseColor.rgb;
float originalAlpha = diffuseColor.a;

// Detectar estado
bool isTextureMode = uUseTexture > 0.5;
bool isTransitioning = abs(uTransitionType) > 0.1 || uProgress < 0.99;

// ============================================================================
// LÓGICA DE TRANSICIÓN
// ============================================================================

if (!isTransitioning && isTextureMode) {
    // MODO TEXTURA PURO: No tocar nada para preservar cristal
    // diffuseColor se mantiene exactamente como viene
    
} else if (uTransitionType > 0.5) {
    // HACIA TEXTURA (Solid/Wire → Textured)
    // Old es sólido/wire, New es textura (originalColor)
    
    vec3 oldSolid = mix(uColorOld, uColorNew, effect); // Interpolación de color base
    vec3 oldWire = mix(uWireColorOld, uWireColorNew, effect);
    
    float oldWireVal = getWireframe(vUv);
    vec3 oldWireLook = mix(oldSolid, oldWire, clamp(oldWireVal, 0.0, 1.0));
    
    // Mezclamos desde el look anterior hacia la textura original
    diffuseColor.rgb = mix(oldWireLook, originalColor, effect);
    diffuseColor.a = mix(0.95, originalAlpha, effect);
    
} else if (uTransitionType < -0.5) {
    // DESDE TEXTURA (Textured → Solid/Wire) 
    // El color destino es FIJO (uColorNew), no interpolado con Old
    
    vec3 targetLook;
    if (uIsWireMode > 0.5) {
        float w = getWireframe(vUv);
        targetLook = mix(uColorNew, uWireColorNew, clamp(w, 0.0, 1.0));
    } else {
        targetLook = uColorNew;
    }
    
    // Mezclamos desde la textura hacia el objetivo sólido
    diffuseColor.rgb = mix(originalColor, targetLook, effect);
    
    float targetAlpha = (uIsWireMode > 0.5) ? 0.9 : 1.0;
    diffuseColor.a = mix(originalAlpha, targetAlpha, effect);
    
} else {
    // ENTRE SOLIDOS/WIRES (Solid→Solid o Wire→Wire)
    // Aquí interpolamos entre Old y New normalmente
    
    if (uIsWireMode > 0.5) {
        vec3 solidMix = mix(uColorOld, uColorNew, effect);
        vec3 wireMix = mix(uWireColorOld, uWireColorNew, effect);
        float w = getWireframe(vUv);
        diffuseColor.rgb = mix(solidMix, wireMix, clamp(w, 0.0, 1.0));
        diffuseColor.a = 0.9;
    } else {
        diffuseColor.rgb = mix(uColorOld, uColorNew, effect);
        diffuseColor.a = 1.0;
    }
}