module.exports = function getIconPath(iconPath) {
  const splitByPath = iconPath.split("/")
  const iconName = splitByPath[splitByPath.length - 1]
  const delimiters = ["_"]
  const delimiterPattern = new RegExp(`[${delimiters.join('')}]`, 'g');
  const finalName = iconName
    .toLowerCase()
    .split(delimiterPattern)
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  const finalPath = 
    splitByPath.slice(0, splitByPath.length - 1).join("/") + "/" + finalName
  return {
    finalName,
    finalPath
  }
}
