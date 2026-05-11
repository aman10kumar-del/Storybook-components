import { DistributiveOmit } from "../../utils/types"
import { ButtonProps } from "../Button/Button.types"

export interface BottomSheetProps {
  active: boolean,
  triggerClose: () => void,
  title?: string,
  description?: string,
  primaryButton?: BottomSheetButtonProps,
  secondaryButton?: BottomSheetButtonProps
  showCloseIcon?: boolean,
  showGrabber?: boolean,
  attachToElementID?: string,
  reserveSpaceForBottomBar?: boolean,
  children?: React.ReactNode,
  customClass?: string
}

export type BottomSheetButtonProps =  DistributiveOmit<ButtonProps, "size" | "type">