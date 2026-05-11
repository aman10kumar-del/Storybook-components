interface AvatarCommonProps {
  size: "small" | "regular" | "large" | "extra-large"
  customClass?: string,
  iconType?: "status" | "action",
  Icon?: React.ReactElement,
  selected?: boolean,
  onAvatarClick?: () => void
}

export interface AvatarIconProps extends AvatarCommonProps {
  type: 'icon';
  avatarIcon: {
    Icon: React.ReactElement;
    outline?: boolean;
    iconColor?: InitialsColorType;
    id?: string | number;
  };
}

export interface AvatarLogoProps extends AvatarCommonProps {
  type: "logo"
  avatarLogo: {
    image: string,
    outline?: boolean,
    /** Replaces `image` if the primary URL fails to load (once). */
    fallbackImage?: string,
    alt?: string,
  }
}

export interface AvatarProfileProps extends AvatarCommonProps {
  type: "profile"
  avatarProfile: {
    imageURL: string,
  }
}

export interface AvatarInitialsProps extends AvatarCommonProps {
  type: "initials"
  avatarInitials: {
    initials: string,
    initialsColor?: InitialsColorType
  }
}

export type InitialsColorType = 
  | "lavender"
  | "water"
  | "pepperMint"
  | "frostedMint"
  | "sprout"
  | "earlyDawn"
  | "wheatField"
  | "mistyRose"
  | "softPeach"
  | "lightRose"
  | "purpleChalk"
  | "plum"
  | "random"
  | "deterministic";



export type AvatarProps = AvatarIconProps | AvatarLogoProps | AvatarProfileProps | AvatarInitialsProps;