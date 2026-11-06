// Genera index.html uniendo src/index.template.html con las secciones de src/sections/.
// Uso: node build.js
const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');

// Normalizar a LF al leer para que el join sea consistente
// independientemente del line ending en disco (CRLF en Windows con autocrlf=true)
function read(p) { return fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n'); }

const tpl = read(path.join(srcDir, 'index.template.html'));

const out = tpl.replace(/^([ \t]*)<!-- @include (.+?) -->[ \t]*$/gm, (m, indent, file) => {
  const p = path.join(srcDir, file.trim());
  if (!fs.existsSync(p)) {
    console.error('No existe la sección: ' + file);
    process.exit(1);
  }
  return indent + '<!-- ' + file.trim() + ' -->\n' + read(p).replace(/\n+$/, '');
});

fs.writeFileSync(path.join(__dirname, 'index.html'), out);
console.log('index.html generado');
