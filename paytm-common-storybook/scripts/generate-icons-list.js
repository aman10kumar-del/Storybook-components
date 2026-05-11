const { resolve, join } = require("path");
const { readdir, writeFile } = require("fs").promises;
const getIconPath = require("./get-icon-path.js");

const iconPathToNameMap = {}

async function getIcons(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory()
        ? getIcons(res)
        : res?.split("/ultra-icons/")[1];
    })
  );
  return Array.prototype.concat(...files);
}

function formatIconName(iconPath, usedNames = new Set()) {
  if (!iconPath || !iconPath.endsWith(".svg")) return null;

  const folders = iconPath.split("/");
  folders.pop(); // Remove the file name
  
  const { finalName } = getIconPath(iconPath);
  const baseName = finalName.replace(".svg", "") + "Icon";

  if (usedNames.has(baseName)) {
    // Join all folder names and capitalize each one
    const prefix = folders
      .map(folder => getIconPath(folder).finalName)
      .join("");
    const finalName = prefix + baseName;
    iconPathToNameMap[iconPath] = finalName;
    return finalName;
  }

  usedNames.add(baseName);
  iconPathToNameMap[iconPath] = baseName;
  return baseName;
}

function generateExportStatement(iconPath, usedNames) {
  if (!iconPath || !iconPath.endsWith(".svg")) return null;
  const iconName = formatIconName(iconPath, usedNames);
  return `export { default as ${iconName} } from './${iconPath}';`;
}

async function generateIconsList(files) {
  const configContent = `
// Do not edit directly.
// Last generated on ${new Date()}

module.exports = ${JSON.stringify(iconPathToNameMap, null, 2)}
`;

  await writeFile(
    join(__dirname, "..", "configs", "icons-list.js"),
    configContent
  );

  const esmContent = `// Do not edit directly.
// Last generated on ${new Date()}
export default ${JSON.stringify(iconPathToNameMap, null, 2)}
`;
  await writeFile(
    join(__dirname, "..", "configs", "icons-list.esm.js"),
    esmContent
  );
}

async function generateIconsIndex(files) {
  const usedNames = new Set();

  const exports = files
    .filter((file) => file && file.endsWith(".svg"))
    .map((file) => generateExportStatement(file, usedNames))
    .filter(Boolean);

  const indexContent = `
// Do not edit directly.
// Last generated on ${new Date()}

${exports.join("\n")}

`;

  await writeFile(
    join(__dirname, "..", "src", "assets", "ultra-icons", "index.js"),
    indexContent
  );
}

async function processIcons(dir) {
  const files = await getIcons(dir);
  await generateIconsIndex(files);
  await generateIconsList(files);
}

processIcons(join(__dirname, "..", "src", "assets", "ultra-icons"))
  .then(() => {
    console.log(
      "\x1b[42m%s\x1b[0m",
      "Successfully generated icon list and index file"
    );
  })
  .catch((e) => {
    console.error("\x1b[41m%s: %s\x1b[0m", "Failed to process icons", e);
  });
