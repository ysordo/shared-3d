const fs = require('fs');
const path = require('path');

function generateDirectoryTree(startPath, outputFile, depth = 10) {
  let tree = '';
  const ignoredDirs = [
    'node_modules',
    '.git',
    'dist',
    '.dist',
    'docs',
    'build',
    '.vscode',
    '.pnpm-store',
    '.struct',
    'structure.cjs',
  ];

  function buildTree(currentPath, currentDepth, prefix = '') {
    if (currentDepth > depth) return;

    try {
      const items = fs.readdirSync(currentPath).sort((a, b) => {
        const aIsDir = fs.statSync(path.join(currentPath, a)).isDirectory();
        const bIsDir = fs.statSync(path.join(currentPath, b)).isDirectory();

        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const fullPath = path.join(currentPath, item);
        const isLast = i === items.length - 1;

        // Saltar directorios ignorados
        if (ignoredDirs.includes(item)) continue;

        try {
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            tree += `${prefix}${isLast ? '└── ' : '├── '}📁${item}/\n`;
            buildTree(
              fullPath,
              currentDepth + 1,
              prefix + (isLast ? '    ' : '│   '),
            );
          } else {
            tree += `${prefix}${isLast ? '└── ' : '├── '}📄${item}\n`;
          }
        } catch (error) {
          tree += `${prefix}${isLast ? '└── ' : '├── '}❌${item} [ERROR: ${
            error.message
          }]\n`;
        }
      }
    } catch (error) {
      tree += `${prefix}[ERROR reading directory: ${error.message}]\n`;
    }
  }

  function buildOtherTree(currentPath, currentDepth, prefix = '') {
    if (currentDepth > depth) return;

    try {
      const items = fs.readdirSync(currentPath).sort((a, b) => {
        const aIsDir = fs.statSync(path.join(currentPath, a)).isDirectory();
        const bIsDir = fs.statSync(path.join(currentPath, b)).isDirectory();

        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const fullPath = path.join(currentPath, item);
        const isLast = i === items.length - 1;

        try {
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            tree += `${prefix}${isLast ? '└── ' : '├── '}📁${item}/\n`;
            buildTree(
              fullPath,
              currentDepth + 1,
              prefix + (isLast ? '    ' : '│   '),
            );
          } else {
            tree += `${prefix}${isLast ? '└── ' : '├── '}📄${item}\n`;
          }
        } catch (error) {
          tree += `${prefix}${isLast ? '└── ' : '├── '}❌${item} [ERROR: ${
            error.message
          }]\n`;
        }
      }
    } catch (error) {
      tree += `${prefix}[ERROR reading directory: ${error.message}]\n`;
    }
  }

  const absoluteStartPath = path.resolve(startPath);
  const parsePatch = startPath.split('/');
  const json = JSON.parse(fs.readFileSync(path.resolve('./package.json')));
  parsePatch[0] = json.name + '#v' + json.version;
  tree = `# Estructura de: ${parsePatch.join('/')}\n`;
  tree += '## Generated: ' + new Date().toLocaleString() + '\n';

  tree += '-'.repeat(3) + '\n\n';

  tree += '`'.repeat(3) + '\n';
  tree += '📂' + json.name + '/\n';
  buildTree(absoluteStartPath, 0);
  tree += '`'.repeat(3) + '\n\n';

  tree += '-'.repeat(3) + '\n\n';

  tree += '`'.repeat(3) + '\n';
  tree += '📂dist/\n';
  buildOtherTree(path.resolve('./dist'), 0);
  tree += '`'.repeat(3) + '\n\n';

  tree += '-'.repeat(3) + '\n\n';

  tree += '`'.repeat(3) + '\n';
  tree += '📂docs/\n';
  buildOtherTree(path.resolve('./docs'), 0);
  tree += '`'.repeat(3) + '\n\n';

  fs.writeFileSync(outputFile, tree, 'utf8');
  console.log(`✅ Estructura guardada en: ${outputFile}`);
}

// Uso: node generate-structure.js [ruta] [archivo_salida]
const startPath = process.argv[2] || '.';
const outputFile = process.argv[3] || 'estructura-proyecto.txt';

generateDirectoryTree(startPath, outputFile);
