import { DistributiveOmit } from '../../utils/types';
import { AvatarProps } from '../Avatar/Avatar.types';
import { ButtonProps } from '../Button/Button.types';
import { SearchProps } from '../Search/Search.types';

export const STATUS_BAR_HEIGHT = '44px';
export const MAX_TRAILING_ITEMS = 2;


interface HeaderCommon {
  reserveSpaceForStatusBar?: boolean;
  showBack?: boolean;
  TrailingIcons?: React.ReactElement[];
  TrailingLinks?: React.ReactElement[];
  customClass?: string;
  onBackClick?: () => void;
}

export type AvatarPropsExceptSize = DistributiveOmit<AvatarProps, 'size'>;
export type HeaderAction = DistributiveOmit<ButtonProps, 'type' | 'size'>;

export interface HeaderSearchProps extends Omit<HeaderCommon, 'showBack' | 'TrailingIcons'> {
  searchProps: SearchProps;
}

export interface HeaderLogoProps extends HeaderCommon {
  logo?: string;
}

export interface HeaderSmallAvatarProps extends HeaderCommon {
  title: string;
  subTitle?: string | React.ReactElement;
  actionProps?: HeaderAction;
  avatarProps?: AvatarPropsExceptSize;
}

export interface HeaderRegularAvatarProps extends HeaderCommon {
  title: string;
  subTitle?: string | React.ReactElement;
  TitleIcon?: React.ReactElement;
  avatarProps?: AvatarPropsExceptSize;
}

export interface HeaderDefaultProps extends HeaderCommon {
  title?: string;
  subTitle?: string | React.ReactElement;
  customTitleComponent?: React.ReactNode;
  avatarProps?: AvatarPropsExceptSize;
  size?: 'large' | 'medium' | 'small';
  TitleIcon?: React.ReactElement;
  actionProps?: HeaderAction;
}

export type HeaderWrapperProps = {
  children: React.ReactNode;
  customClass?: string;
  reserveSpaceForStatusBar?: boolean;
};
