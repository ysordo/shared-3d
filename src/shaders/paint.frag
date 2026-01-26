float normX = (vPosX - uMinX) / (uMaxX - uMinX);
float threshold = uProgress * 1.1; 
float effect = smoothstep(threshold - 0.1, threshold, normX);

// Siempre calculamos el color texturado original (si aplica)
vec3 texturedColor = diffuseColor.rgb;  // Asumiendo que el mapa ya está en diffuseColor antes de este chunk

vec3 targetRGB;
float targetAlpha = 1.0;

// Calculamos el color no-textura (sólido o wireframe)
vec3 nonTexturedRGB;
if (uIsWireMode > 0.5) {
    float wire = getWireframe(vUv);
    vec3 background = mix(uColorNew, uColorOld, effect);
    vec3 lineColor = mix(uWireColorOld, uWireColorNew, effect);
    nonTexturedRGB = mix(background, lineColor, clamp(wire, 0.0, 1.0));
    targetAlpha = 0.95;
} else {
    nonTexturedRGB = mix(uColorNew, uColorOld, effect);
}

// ─────────────────────────────────────────
// DECISIÓN FINAL DE COLOR (SIN AMBIGÜEDAD)

// Transición ACTIVA
if (uToTextureMode > 0.5) {
    // yendo HACIA textura
    targetRGB = mix(nonTexturedRGB, texturedColor, effect);
}
else if (uToTextureMode < 0.0) {
    // (no usado, pero dejo claro el concepto)
    targetRGB = mix(texturedColor, nonTexturedRGB, effect);
}
else {
    // SIN transición → usar modo REAL
    if (uUseTexture > 0.5) {
        targetRGB = texturedColor;
    } else {
        targetRGB = nonTexturedRGB;
    }
}


// LÓGICA DE SALIDA (ajustada para siempre aplicar targetRGB)
diffuseColor.rgb = targetRGB;
diffuseColor.a = mix(targetAlpha, diffuseColor.a, uGlassOpacity);