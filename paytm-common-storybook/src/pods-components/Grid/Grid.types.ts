import { DistributiveOmit } from "../../utils/types"
import { AvatarProps } from "../Avatar/Avatar.types"

interface GridCommonProps {
  customClass?: string
}

interface GridItem {
  Icon: React.ReactElement,
  label: string
}

export interface GridCategoryProps extends GridCommonProps {
  type: "category",
  gridCategory: {
    items: GridItem[]
  }
}

export interface GridIconProps extends GridCommonProps {
  type: "icon",
  gridIcon: {
    items: GridItem[]
  }
}

export type AvatarPropsExceptSize = DistributiveOmit<AvatarProps, "size">

interface GridAvatarItems {
  avatarProps: AvatarPropsExceptSize,
  label: string
}

export interface GridAvatarProps extends GridCommonProps {
  type: "avatar",
  gridAvatar: {
    items: GridAvatarItems[]
  }
}

export type GridProps = GridCategoryProps | GridIconProps | GridAvatarProps