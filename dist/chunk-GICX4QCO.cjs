"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/utils/QuadWireframe.ts
var createQuadWireframe = (geometry) => {
  const position = geometry.attributes.position;
  const indices = _optionalChain([geometry, 'access', _2 => _2.index, 'optionalAccess', _3 => _3.array]);
  const vertices = [];
  const edgeMap = /* @__PURE__ */ new Map();
  const getKey = (a, b) => a < b ? `${a},${b}` : `${b},${a}`;
  if (!indices) {
    return new _chunkEA3XQ4KJcjs.THREE.EdgesGeometry(geometry, 30);
  }
  if (!position) {
    return new _chunkEA3XQ4KJcjs.THREE.EdgesGeometry(geometry, 30);
  }
  const vertexPositions = [];
  for (let i = 0; i < position.count; i++) {
    vertexPositions.push([
      position.array[i * 3],
      position.array[i * 3 + 1],
      position.array[i * 3 + 2]
    ]);
  }
  const distanceSq = (a, b) => {
    const [x1, y1, z1] = vertexPositions[a];
    const [x2, y2, z2] = vertexPositions[b];
    return (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2;
  };
  const trianglePairs = /* @__PURE__ */ new Map();
  for (let i = 0; i < indices.length; i += 3) {
    const [a, b, c] = [indices[i], indices[i + 1], indices[i + 2]];
    [getKey(a, b), getKey(b, c), getKey(c, a)].forEach((edge) => {
      if (!trianglePairs.has(edge)) {
        trianglePairs.set(edge, []);
      }
      trianglePairs.get(edge).push(i / 3);
    });
  }
  for (let i = 0; i < indices.length; i += 3) {
    const [a, b, c] = [indices[i], indices[i + 1], indices[i + 2]];
    const edges = [
      { key: getKey(a, b), verts: [a, b] },
      { key: getKey(b, c), verts: [b, c] },
      { key: getKey(c, a), verts: [c, a] }
    ];
    const lengths = [distanceSq(a, b), distanceSq(b, c), distanceSq(c, a)];
    const maxIdx = lengths.indexOf(Math.max(...lengths));
    const diagonal = edges[maxIdx];
    const legs = edges.filter((_, i2) => i2 !== maxIdx);
    const isQuad = (_optionalChain([trianglePairs, 'access', _4 => _4.get, 'call', _5 => _5(diagonal.key), 'optionalAccess', _6 => _6.length]) || 0) > 1;
    (isQuad ? legs : edges).forEach(({ verts: [V1, V2] }) => {
      const v1 = V1;
      const v2 = V2;
      const key = getKey(v1, v2);
      if (!edgeMap.has(key)) {
        edgeMap.set(key, 1);
        vertices.push(
          position.array[v1 * 3],
          position.array[v1 * 3 + 1],
          position.array[v1 * 3 + 2],
          position.array[v2 * 3],
          position.array[v2 * 3 + 1],
          position.array[v2 * 3 + 2]
        );
      }
    });
  }
  const geo = new _chunkEA3XQ4KJcjs.THREE.BufferGeometry();
  geo.setAttribute("position", new _chunkEA3XQ4KJcjs.THREE.Float32BufferAttribute(vertices, 3));
  return geo;
};



exports.createQuadWireframe = createQuadWireframe;
