import * as fs from 'fs'
import path from 'path';
const pwd = path.resolve();

export default function importStyles() {
  const importPaths = [];
  return {
    generateBundle(options, bundle){
      let importPath = [];
      for (const [fileName, fileMeta] of Object.entries(bundle)) {
        if (options.format === "cjs") continue;
        if (fileName === "index.js") {
          importPath = ["../styles/index-common.css", "../styles/variables.css"]
        } else {
          var rx = /^pods-components\/(?<component>\w+)\/(?<variation>\w+)?(\/)?\k<component>\k<variation>\.js$/;
          var match = fileName.match(rx);
          if (!match) continue;
          const {groups: {component, variation}} = match;
          importPath = [`../../../styles/${component}/${component}.css`]
          if (variation) {
            importPath = [`../../../../styles/${component}/${variation}/${component}${variation}.css`]
          }
        }
        importPaths.push(...importPath)
        fileMeta.code = importPath.reduce((acc, curr) => {
          return acc + `import "${curr}";\n`
        }, "") + fileMeta.code;
      }
    },
    writeBundle(){
      const getImportPathData = () => {
        return importPaths.map(importPath => {
          return `require ("${importPath.replace(/(\.\.\/)+/, "../")}");`
        }).join("\n");
      }
      let data = fs.readFileSync(`${pwd}/dist/commonComponents/index.js`, {encoding:'utf8'});
      data = getImportPathData() + data
      fs.writeFileSync(`${pwd}/dist/commonComponents/index.js`, data)
    },
  }
}