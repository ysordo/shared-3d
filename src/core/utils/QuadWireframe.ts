import { THREE } from '../../lib';

export const createQuadWireframe = (
  geometry: THREE.BufferGeometry
): THREE.BufferGeometry => {
  const position = geometry.attributes.position;
  const indices = geometry.index?.array;
  const vertices: number[] = [];
  const edgeMap = new Map<string, number>();

  const getKey = (a: number, b: number) => (a < b ? `${a},${b}` : `${b},${a}`);

  if (!indices) {
    return new THREE.EdgesGeometry(geometry, 30);
  }
  if(!position) {
    return new THREE.EdgesGeometry(geometry, 30);
  }

  const vertexPositions: number[][] = [];
  for (let i = 0; i < position.count; i++) {
    vertexPositions.push([
      position.array[i * 3] as number,
      position.array[i * 3 + 1] as number,
      position.array[i * 3 + 2] as number,
    ]);
  }

  const distanceSq = (a: number, b: number) => {
    const [x1, y1, z1] = vertexPositions[a] as [number, number, number];
    const [x2, y2, z2] = vertexPositions[b] as [number, number, number];
    return (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2;
  };

  const trianglePairs = new Map<string, number[]>();

  for (let i = 0; i < indices.length; i += 3) {
    const [a, b, c] = [indices[i], indices[i + 1], indices[i + 2]] as [number, number, number];
    [getKey(a, b), getKey(b, c), getKey(c, a)].forEach((edge) => {
      if (!trianglePairs.has(edge)) {
        trianglePairs.set(edge, []);
      }
      trianglePairs.get(edge)!.push(i / 3);
    });
  }

  for (let i = 0; i < indices.length; i += 3) {
    const [a, b, c] = [indices[i], indices[i + 1], indices[i + 2]] as [number, number, number];
    const edges = [
      { key: getKey(a, b), verts: [a, b] },
      { key: getKey(b, c), verts: [b, c] },
      { key: getKey(c, a), verts: [c, a] },
    ];

    const lengths = [distanceSq(a, b), distanceSq(b, c), distanceSq(c, a)];
    const maxIdx = lengths.indexOf(Math.max(...lengths));
    const diagonal = edges[maxIdx] as { key: string; verts: [number, number] };
    const legs = edges.filter((_, i) => i !== maxIdx);

    const isQuad = (trianglePairs.get(diagonal.key)?.length || 0) > 1;

    (isQuad ? legs : edges).forEach(({ verts: [V1, V2] }) => {
      const v1 = V1 as number;
      const v2 = V2 as number;
      const key = getKey(v1, v2);
      if (!edgeMap.has(key)) {
        edgeMap.set(key, 1);
        vertices.push(
          position.array[v1 * 3] as number,
          position.array[v1 * 3 + 1] as number,
          position.array[v1 * 3 + 2] as number,
          position.array[v2 * 3] as number,
          position.array[v2 * 3 + 1] as number,
          position.array[v2 * 3 + 2] as number
        );
      }
    });
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  return geo;
};