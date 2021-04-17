const SVGSpriter = require('svg-sprite');
const path = require('path');
const fs = require('fs');

// Script for generate svg sprite based on provided svg icons

const assetsDir = path.resolve(`${__dirname}/../src/assets`);
const iconsDir = `${assetsDir}/icons`;
const destDir = `${assetsDir}/sprite.svg`;
const spriter = new SVGSpriter({
  shape: {
    transform: [
      {
        svgo: {
          full: true, // Totally exclude default svgo config
          plugins: [
            { removeXMLNS: true },
            { removeTitle: true },
            // replace class with styles
            { inlineStyles: { onlyMatchedOnce: false } },
            // convert style attribute to element attributes
            { convertStyleToAttrs: true },
            { convertColors: { currentColor: true } },
            // Remove attributes from group attributes
            { removeAttrs: { attrs: '(data.*|id)' } },
            // Remove empty groups
            { collapseGroups: true },
            // move similar attributes to groups
            { moveElemsAttrsToGroup: true },
          ],
        },
      },
    ],
  },
  mode: {
    symbol: {
      inline: true,
    },
  },
});

fs.readdirSync(iconsDir).forEach((fileName) => {
  const filePath = `${iconsDir}/${fileName}`;
  spriter.add(
    path.resolve(filePath),
    fileName,
    fs.readFileSync(filePath, { encoding: 'utf-8' })
  );
});

spriter.compile((error, result) => {
  fs.writeFileSync(destDir, result.symbol.sprite.contents);
});
