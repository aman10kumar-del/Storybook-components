export const argTypes = {
  type: {
    description: "Type of the Grid component. Possible values are",
    table: {
      defaultValue: {
        summary: "category"
      }
    }
  },
  gridAvatar: {
    description: `Configs specific to Grid-Avatar. Use this only if 'type' is 'avatar'\n
    {
      items: Array of objects where each object is of below shape
        {
          avatarProps: Object: Props that need to be forwarded to the Avatar component. Please check Avatar component for all the avaialble props.
    Please not that 'size' option will not be avaialable since it will be fixed here\n
          label: string
        }
    }
    `,
    table: {
      type: "",
      defaultValue: {
        summary: JSON.stringify({
          items: []
        })
      }
    }
  },
  gridCategory: {
    description: `Configs specific to Grid-Category. Use this only if 'type' is 'category'\n
    {
      items: Array of objects where each object is of below shape
        {
          Icon: React.ReactElement\n
          label: string
        }
    }
    `,
    table: {
      type: "",
      defaultValue: {
        summary: JSON.stringify({
          items: []
        })
      }
    }
  },
  gridIcon: {
    description: `Configs specific to Grid-Icon. Use this only if 'type' is 'icon'\n
    {
      items: Array of objects where each object is of below shape
        {
          Icon: React.ReactElement\n
          label: string
        }
    }
    `,
    table: {
      type: "",
      defaultValue: {
        summary: JSON.stringify({
          items: []
        })
      }
    }
  },
}