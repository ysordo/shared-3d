// Cálculo del progreso espacial (de izquierda a derecha)
float normX = (vPosX - uMinX) / (uMaxX - uMinX);
// Ajuste para que la transición cubra todo el modelo (1.2) y empiece un poco antes (-0.1)
float threshold = uProgress * 1.2 - 0.1; 
// Zona suave de transición (0.1 de ancho)
float effect = smoothstep(threshold - 0.1, threshold, normX);

// Color original con textura (del material base)
vec3 texturedColor = diffuseColor.rgb;
vec3 finalColor;

// ============================================================================
// LÓGICA DE TRANSICIÓN CORREGIDA
// uToTextureMode: 
//   1.0  = Solid/Wire → Textured (entrando a textura)
//  -1.0  = Textured → Solid/Wire (saliendo de textura)  
//   0.0  = Solid→Solid o Wire→Wire (cambio de color o activación de wireframe)
// ============================================================================

if (uToTextureMode > 0.5) {
    // ------------------------------------------------------------------------
    // CASO 1: Solid/Wire → Textured
    // ------------------------------------------------------------------------
    vec3 solidColor = mix(uColorOld, uColorNew, effect);
    
    // Si el modo objetivo es wireframe, calcular líneas sobre el color sólido
    if (uIsWireMode > 0.5) {
        float wire = getWireframe(vUv);
        vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);
        vec3 wireColor = mix(solidColor, lineColor, clamp(wire, 0.0, 1.0));
        // Mezclamos desde wireColor hacia texturedColor
        finalColor = mix(wireColor, texturedColor, effect);
    } else {
        // Solid puro hacia textura
        finalColor = mix(solidColor, texturedColor, effect);
    }
    
} else if (uToTextureMode < -0.5) {
    // ------------------------------------------------------------------------
    // CASO 2: Textured → Solid/Wire  
    // ------------------------------------------------------------------------
    vec3 targetSolid = mix(uColorOld, uColorNew, effect);
    
    if (uIsWireMode > 0.5) {
        float wire = getWireframe(vUv);
        vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);
        vec3 wireColor = mix(targetSolid, lineColor, clamp(wire, 0.0, 1.0));
        // Mezclamos desde texturedColor hacia wireColor
        finalColor = mix(texturedColor, wireColor, effect);
    } else {
        // Desde textura hacia solid puro
        finalColor = mix(texturedColor, targetSolid, effect);
    }
    
} else {
    // ------------------------------------------------------------------------
    // CASO 3: Transición del mismo tipo (Solid→Solid o Wire→Wire)
    // ------------------------------------------------------------------------
    if (uIsWireMode > 0.5) {
        // Modo Wireframe: mezclamos fondo y líneas
        float wire = getWireframe(vUv);
        vec3 bgColor = mix(uColorOld, uColorNew, effect);
        vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);
        
        // La intensidad del wireframe aparece gradualmente con el efecto
        // Si venimos de sólido (wire no visible antes), effect controla la aparición
        float wireIntensity = clamp(wire, 0.0, 1.0);
        
        finalColor = mix(bgColor, lineColor, wireIntensity);
    } else {
        // Modo Sólido puro: solo interpolación de colores
        finalColor = mix(uColorOld, uColorNew, effect);
    }
}

// Aplicar color final
diffuseColor.rgb = finalColor;

// Manejo de transparencia (cristal vs sólido)
// Cuando uGlassOpacity es 1.0, mantiene el alpha original (cristal)
// Cuando es 0.0, fuerza alpha 0.95 (sólido)
float targetAlpha = (uIsWireMode > 0.5) ? 0.95 : 1.0;
diffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);