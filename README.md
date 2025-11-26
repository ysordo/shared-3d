***
<div align="center">

# shared-3d

**The most advanced, beautiful and extensible React + Three.js 3D library in the world.**

[![npm](https://img.shields.io/npm/v/shared-3d?color=%23cb0000&style=for-the-badge&logo=npm)](https://www.npmjs.com/package/shared-3d)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r177-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)

![shared-3d preview](https://github.com/user-attachments/assets/your-gif-or-screenshot-here.gif)

> "This is not just a library. This is art." — Every developer who uses it

</div>

***

## Why shared-3d?

You no longer need:

- `@react-three/fiber`
- `@react-three/drei`
- 50 plugins
- Manual caching
- Fake wireframes
- Ugly transitions

**shared-3d** is **everything you ever dreamed of** in a 3D library — **in one single package**.

### Features

| Feature                        | Status | Description |
|-------------------------------|--------|-----------|
| `<Canvas>`                    | Done   | Zero-config, like magic |
| `<Model draco />`             | Done   | Instant loading after first time |
| `<HDRI />`                    | Done   | Studio lighting in one line |
| Cinematic material transitions | Done   | Cascading effect per mesh |
| **Real wireframe**            | Done   | LineSegments, not `wireframe: true` |
| Plugin system                 | Done   | Add VR, physics, audio… easily |
| `<MaterialController>`       | Done   | Change materials with style |
| `<AnimationController>`      | Done   | Forward / backward animations |
| Intelligent caching           | Done   | Offline-first after first load |
| 100% TypeScript               | Done   | No `any`, no `as`, pure safety |

## Quick Start

```tsx
import { Canvas, Model, HDRI, OrbitControls, MaterialController } from 'shared-3d';

function App() {
  return (
    <Canvas config={{ shadows: true, antialias: true }}>
      <HDRI entry={studioHDRI} />
      <Model entry={carEntry} draco />

      <OrbitControls />
      
      <MaterialController transitionDuration={1200}>
        {(materials) => (
          <div className="ui-panel">
            {materials.map(m => (
              <button key={m.name} onClick={m.apply}>
                {m.name} {m.isActive && 'Check'}
              </button>
            ))}
          </div>
        )}
      </MaterialController>
    </Canvas>
  );
}
```

## Installation

```bash
npm install shared-3d
# or
pnpm add shared-3d
# or
yarn add shared-3d
```

## Documentation
API Reference

## Author
Junior Yohan Sordo García
juniorsordogarcia@gmail.com
@ysordo

## Fork it
1. Create your feature branch (git checkout -b feature/amazing)
2. Commit (git commit -m 'Add amazing feature')
3. Push (git push origin feature/amazing)
4. Open a Pull Request

## License
[MIT License](./LICENSE) — Use it, modify it, sell it, love it. 

***

<div align="center">
    <p>Made with passion in 2025.</p>
    <p>shared-3d — Not just 3D. It's art.</p>
</div>