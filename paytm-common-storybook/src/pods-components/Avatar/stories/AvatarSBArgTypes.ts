export const argTypes = {
  type: {
    description: "Use this prop to chose the avatar type. Possible value are"
  },
  avatarIcon: {
    description: `Configs specific to AvatarIcon. Use this prop only if 'type' is 'icon'. Pass an object with below shape\n
    {
      iconType: "fill" | "outline",
      Icon: React.ReactElement
    }`,
    table: {
      type: "",
      defaultValue: {
        summary: JSON.stringify({
          iconType: "outline"
        })
      }
    }
  },
  avatarLogo: {
    description: `Configs specific to AvatarLogo. Use this prop only if 'type' is 'logo'. Pass an object with below shape\n
    {
      image: string: URL of the logo image,
      StatusIcon?: React.ReactElement,
      selected?: boolean
    }`,
    table: {
      type: "",
      defaultValue: {
        summary: JSON.stringify({
          image: "",
          selected: "false",
        })
      }
    }
  },
  avatarProfile: {
    description: `Configs specific to AvatarProfile. Use this prop only if 'type' is 'profile'. Pass an object with below shape\n
    {
      profileType: "pic" | "initials",
      profileContent: string: If profileType is pic then pass the image URL here, else pass the initials,
      iconType?: "status" | "action",
      Icon?: React.ReactElement,
      selected?: boolean,
      initialsColor?: "lavender" | "water" | "pepperMint" | "frostedMint" | "sprout" | "earlyDawn" | "wheatField" | "mistyRose" | "softPeach" | "lightRose" | "purpleChalk" | "plum" | "random": Controls the color theme when profileType is "initials"
    }`,
    table: {
      type: "",
      defaultValue: {
        summary: JSON.stringify({
          profileType: "initials",
          profileContent: "",
          selected: "false",
          initialsColor: ""
        })
      }
    }
  },
  size: {
    description: "Size of the Avatar. Possible values are"
  },
  onAvatarClick: {
    description: "Callback that will be triggered when Avatar is clicked"
  }
}