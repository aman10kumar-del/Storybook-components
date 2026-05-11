import React from "react"
import { SectionHeaderProps } from "../SectionHeader/SectionHeader.types"
import { DistributiveOmit } from "../../utils/types"
import { SearchProps } from "../Search/Search.types"

type BottomSheetHeader = DistributiveOmit<SectionHeaderProps, "">
type BottomSheetSearch = DistributiveOmit<SearchProps, "onChange" | "onClear">

export interface DropDownProps {
  label: string,
  value: DropDownOption,
  options: DropDownOption[],
  onChange: (value: DropDownOption) => void,
  iText?: string,
  error?: string,
  disabled?: boolean,
  LeadingIcon ?: React.ReactElement,
  sKey?: string,
  sValue?: string,
  customClassDropdown?: string,
  customClassInfoArea?: string,
  customClassBottomSheet?: string
  attachToElementID?: string,
  bottomSheetHeaderProps?: BottomSheetHeader
  bottomSheetSearchProps?: BottomSheetSearch
  emphasis?: 'high' | 'low'
}

export interface DropDownOption {
  [x: string]:  string
}