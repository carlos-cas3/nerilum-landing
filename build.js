// Genera index.html uniendo src/index.template.html con las secciones de src/sections/.
// Uso: node build.js
const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');
const tpl = fs.readFileSync(path.join(srcDir, 'index.template.html'), 'utf8');

const out = tpl.replace(/^([ \t]*)<!-- @include (.+?) -->[ \t]*$/gm, (m, indent, file) => {
  const p = path.join(srcDir, file.trim());
  if (!fs.existsSync(p)) {
    console.error('No existe la sección: ' + file);
    process.exit(1);
  }
  return indent + '<!-- ' + file.trim() + ' -->\r\n' + fs.readFileSync(p, 'utf8').replace(/(\r?\n)+$/, '');
});

fs.writeFileSync(path.join(__dirname, 'index.html'), out.replace(/\r\n|\r|\n/g, '\r\n'));
console.log('index.html generado');
