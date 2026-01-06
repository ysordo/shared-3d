declare module 'n8ao' {
    class N8AOPostPass {
        constructor(scene, camera, width = 512, height = 512);
        configuration;
        setSize(width, height);
        dispose();
    };
};