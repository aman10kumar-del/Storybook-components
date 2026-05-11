export const headerArgTypesCommon = {
  showBack: {
    description: 'To show / hide back button',
    table: {
      defaultValue: {
        summary: true,
      },
    },
  },
  onBackClick: {
    description: 'Callback that will be triggered when back button is clicked',
  },
  TrailingIcons: {
    description: 'Trailing icons for the header component. Max items is 2',
    table: {
      defaultValue: {
        summary: '[]',
      },
    },
  },
  TrailingLinks: {
    description: 'React.ReactElement[]: Links to be shown. Max items is 2',
    table: {
      defaultValue: {
        summary: '[]',
      },
    },
  },
  reserveSpaceForStatusBar: {
    description: 'To show / hide extra padding at the top for status bar',
    table: {
      defaultValue: {
        summary: false,
      },
    },
  },
};

export const headerArgTypesLogo = {
  ...headerArgTypesCommon,
  logo: {
    description: 'Custom logo image url',
    table: {
      defaultValue: {
        summary: '',
      },
    },
  },
};

export const headerArgTypesDefault = {
  ...headerArgTypesCommon,
  title: {
    description: 'Title of the header',
    table: {
      defaultValue: {
        summary: '',
      },
    },
  },
  subTitle: {
    description: 'Subtitle of the header',
    table: {
      defaultValue: {
        summary: '',
      },
    },
  },
  customTitleComponent: {
    description: "Custom component to be shown instead of title and subtitle"
  },
  avatarProps: {
    description:
      'Props that need to be forwarded to the Avatar component. Please check Avatar component for all the avaialble props',
    table: {
      defaultValue: {
        summary: '{}',
      },
    },
  },
  size: {
    description: 'Size variant of the header: large (default layout), medium (regular avatar layout), small (small avatar layout)',
    control: {
      type: 'radio',
      options: ['large', 'medium', 'small']
    },
    table: {
      defaultValue: {
        summary: 'large',
      },
    },
  },
  TitleIcon: {
    description: 'Icon to be shown beside the title (only applicable for medium size)',
    table: {
      defaultValue: {
        summary: '',
      },
    },
  },
  actionProps: {
    description: 'Props for action button (only applicable for small size). Please check Button component for all the available props',
    table: {
      defaultValue: {
        summary: '{}',
      },
    },
  },
};

export const headerArgTypesRegularAvatar = {
  ...headerArgTypesCommon,
  title: {
    description: 'Title of the header',
    table: {
      defaultValue: {
        summary: '',
      },
    },
  },
  subTitle: {
    description: 'Subtitle of the header',
    table: {
      defaultValue: {
        summary: '',
      },
    },
  },
  TitleIcon: {
    description: 'Icon to be shown beside the title',
    table: {
      defaultValue: {
        summary: '',
      },
    },
  },
  avatarProps: {
    description:
      'Props that need to be forwarded to the Avatar component. Please check Avatar component for all the avaialble props',
    table: {
      defaultValue: {
        summary: '{}',
      },
    },
  },
};

const filteredHeaderArgTypesFromCommon = Object.fromEntries(Object.entries(headerArgTypesCommon).filter(([key]) => {
  return !['showBack', 'TrailingIcons', 'TrailingLinks'].includes(key)
}))

export const headerArgTypesSearch = {
  ...filteredHeaderArgTypesFromCommon,
  searchProps: {
    description:
      'Props that need to be forwarded to the Search component. Please check Search component for all the avaialble props',
    table: {
      defaultValue: {
        summary: '{}',
      },
    },
  },
};

export const headerArgTypesSmallAvatar = {
  ...headerArgTypesCommon,
  title: {
    description: 'Title of the header',
    table: {
      defaultValue: {
        summary: '',
      },
    },
  },
  subTitle: {
    description: 'Subtitle of the header',
    table: {
      defaultValue: {
        summary: '',
      },
    },
  },
  actionProps: {
    description: 'Props that need to be forwarded to the action button component. Please check Button component for all the available props',
    table: {
      defaultValue: {
        summary: '{}',
      },
    },
  },
  avatarProps: {
    description:
      'Props that need to be forwarded to the Avatar component. Please check Avatar component for all the available props',
    table: {
      defaultValue: {
        summary: '{}',
      },
    },
  },
};
