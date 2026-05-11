export const getFigmaLinkHTML = (link: string, title: string = "Figma") => {
  return `<h4 style="padding-top:10px;margin-top:0px">
    ${title}: 
    <a 
      target="_blank" 
      href="${link}"
      >
      Click here
    </a>
  </h4> 
  `
}