export interface AccordionProps {
  items: Item[],
  customClass?: string,
  separator?: boolean,
  hideSeparatorForLastItem?: boolean,
}

interface Item {
  id?: string,
  title: React.ReactNode,
  content: React.ReactNode
}