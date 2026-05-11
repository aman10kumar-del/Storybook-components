import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@storybook/testing-library';

import {
  HeaderDefault,
  HeaderLogo,
  HeaderRegularAvatar,
  HeaderSearch,
  HeaderSmallAvatar,
} from './Header';
import { ReactComponent as InfoIcon } from '../../assets/img/infoFlexiColor.svg';
import userEvent from '@testing-library/user-event';

enum HeaderAvatarImagePosition {
  LEADING = 'leading',
  TRAILING = 'trailing',
}

enum HeaderTitlePosition {
  INLINE = 'inline',
  NEXTLINE = 'nextline',
}

jest.useFakeTimers();

describe('Test Default', () => {
  test('default', async () => {
    //@ts-ignore
    render(<HeaderDefault />);
    await waitFor(() => {
      const headerDefault = screen.getByTestId('header-default');
      expect(headerDefault).toBeInTheDocument();
    });
  });
});

describe('Test Header Default', () => {
  test('is present', () => {
    render(<HeaderDefault onBackClick={() => {}} />);
    const headerDefault = screen.getByTestId('header-default');
    expect(headerDefault).toBeInTheDocument();
  });

  test('inline title', () => {
    render(
      <HeaderDefault
        onBackClick={() => {}}
        title="Title"
      />
    );
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Title');
    const headerSecondLine = screen.queryByTestId('second-line');
    expect(headerSecondLine).toBeNull();
  });

  test('large size title (Figma extended)', () => {
    render(
      <HeaderDefault
        onBackClick={() => {}}
        title="Title"
        size="large"
      />
    );
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Title');
    const headerSecondLine = screen.getByTestId('second-line');
    expect(headerSecondLine).toBeInTheDocument();
  });

  test('back click', () => {
    const onBackClick = jest.fn();
    render(
      <HeaderDefault
        onBackClick={onBackClick}
        title="Title"
        size="large"
      />
    );
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    expect(onBackClick).toHaveBeenCalled();
  });

  test('subtitle', () => {
    const onBackClick = jest.fn();
    render(
      <HeaderDefault
        onBackClick={onBackClick}
        title="Title"
        size="large"
        subTitle="subTitle"
      />
    );
    const subTitle = screen.getByTestId('sub-title');
    expect(subTitle).toBeInTheDocument();
    expect(subTitle).toHaveTextContent('subTitle');
  });

  test('trailing icons', () => {
    const onBackClick = jest.fn();
    render(
      <HeaderDefault
        onBackClick={onBackClick}
        TrailingIcons={[<InfoIcon />, <InfoIcon />]}
        title="Title"
        size="large"
        subTitle="subTitle"
      />
    );
    const iconOne = screen.getByTestId('icon-0');
    const iconTwo = screen.getByTestId('icon-1');
    expect(iconOne).toBeInTheDocument();
    expect(iconTwo).toBeInTheDocument();
  });

  test('trailing link', () => {
    const onBackClick = jest.fn();
    render(
      <HeaderDefault
        onBackClick={onBackClick}
        title="Title"
        size="large"
        subTitle="subTitle"
        TrailingLinks={[<a>One</a>, <a>Two</a>]}
      />
    );
    const LinkOne = screen.getByTestId('link-0');
    const LinkTwo = screen.getByTestId('link-1');
    expect(LinkOne).toBeInTheDocument();
    expect(LinkTwo).toBeInTheDocument();
  });

  test('icon preferred over links', () => {
    const onBackClick = jest.fn();
    render(
      <HeaderDefault
        onBackClick={onBackClick}
        TrailingIcons={[<InfoIcon />, <InfoIcon />]}
        title="Title"
        size="large"
        subTitle="subTitle"
        TrailingLinks={[<a>One</a>, <a>Two</a>]}
      />
    );
    const iconOne = screen.getByTestId('icon-0');
    const iconTwo = screen.getByTestId('icon-1');
    expect(iconOne).toBeInTheDocument();
    expect(iconTwo).toBeInTheDocument();
  });

  test("custom element rendered", () => {
    render(
      <HeaderDefault
        customTitleComponent={(<div data-testid="custom-element">Custom Element</div>)}
      />
    );
    const customElement = screen.getByTestId("custom-element");
    expect(customElement).toBeInTheDocument();
    expect(customElement).toHaveTextContent("Custom Element")
  });

  test("custom element not rendered if title is present", () => {
    render(
      <HeaderDefault
        customTitleComponent={(<div data-testid="custom-element">Custom Element</div>)}
        title="Title"
      />
    );
    const header = screen.getByTestId("header-default");
    expect(header).not.toHaveTextContent("Custom Element")
  });

  test("custom element not rendered if sub-title is present", () => {
    render(
      <HeaderDefault
        customTitleComponent={(<div data-testid="custom-element">Custom Element</div>)}
        subTitle="SubTitle"
      />
    );
    const header = screen.getByTestId("header-default");
    expect(header).not.toHaveTextContent("Custom Element")
  });
  
});

describe('Test Header Logo', () => {
  test('present', async () => {
    render(<HeaderLogo onBackClick={() => {}} />);
    await waitFor(() => {
      const headerLogo = screen.getByTestId('header-logo');
      expect(headerLogo).toBeInTheDocument();
    });
  });

  test('defaults', () => {
    render(
      //@ts-ignore
      <HeaderLogo />
    );
    const headerLogo = screen.getByTestId('header-logo');
    expect(headerLogo).toBeInTheDocument();
  });

  test('logo present', () => {
    render(<HeaderLogo onBackClick={() => {}} />);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  test('back button click', () => {
    const onBackClick = jest.fn();
    render(<HeaderLogo onBackClick={onBackClick} />);
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    expect(onBackClick).toHaveBeenCalled();
  });

  test('trailing icons', () => {
    render(
      <HeaderLogo
        onBackClick={() => {}}
        TrailingIcons={[<InfoIcon />, <InfoIcon />]}
      />
    );
    const iconOne = screen.getByTestId('icon-0');
    const iconTwo = screen.getByTestId('icon-1');
    expect(iconOne).toBeInTheDocument();
    expect(iconTwo).toBeInTheDocument();
  });

  test('trailing link', () => {
    render(
      <HeaderLogo
        onBackClick={() => {}}
        TrailingLinks={[<a>One</a>, <a>Two</a>]}
      />
    );
    const LinkOne = screen.getByTestId('link-0');
    const LinkTwo = screen.getByTestId('link-1');
    expect(LinkOne).toBeInTheDocument();
    expect(LinkTwo).toBeInTheDocument();
  });

  test('icon preferred over links', () => {
    render(
      <HeaderLogo
        onBackClick={() => {}}
        TrailingIcons={[<InfoIcon />, <InfoIcon />]}
        TrailingLinks={[<a>One</a>, <a>Two</a>]}
      />
    );
    const iconOne = screen.getByTestId('icon-0');
    const iconTwo = screen.getByTestId('icon-1');
    expect(iconOne).toBeInTheDocument();
    expect(iconTwo).toBeInTheDocument();
  });
});

describe('Test Header Small Avatar', () => {
  test('present', async () => {
    render(
      <HeaderSmallAvatar
        onBackClick={() => {}}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        avatarImagePosition={HeaderAvatarImagePosition.LEADING}
      />
    );
    await waitFor(() => {
      const headerSmallAvatar = screen.getByTestId('header-small-avatar');
      expect(headerSmallAvatar).toBeInTheDocument();
    });
  });

  test('defaults', () => {
    render(
      //@ts-ignore
      <HeaderSmallAvatar />
    );
    const headerSmallAvatar = screen.getByTestId('header-small-avatar');
    expect(headerSmallAvatar).toBeInTheDocument();
  });

  test('avatar present', () => {
    render(
      <HeaderSmallAvatar
        onBackClick={() => {}}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        avatarImagePosition={HeaderAvatarImagePosition.LEADING}
      />
    );
    const avatarImage = screen.getByTestId('avatar-image');
    expect(avatarImage).toBeInTheDocument();
  });

  test('trailing', () => {
    render(
      <HeaderSmallAvatar
        onBackClick={() => {}}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        avatarImagePosition={HeaderAvatarImagePosition.TRAILING}
      />
    );
    const backButton = screen.getByTestId('back-button');
    expect(backButton).toBeInTheDocument();
  });

  test('back button click', () => {
    const onBackClick = jest.fn();
    render(
      <HeaderSmallAvatar
        onBackClick={onBackClick}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        avatarImagePosition={HeaderAvatarImagePosition.TRAILING}
      />
    );
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    expect(onBackClick).toHaveBeenCalled();
  });

  test('trailing but back button hidden', () => {
    render(
      <HeaderSmallAvatar
        onBackClick={() => {}}
        showBack={false}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        avatarImagePosition={HeaderAvatarImagePosition.TRAILING}
      />
    );
    const backButton = screen.queryByTestId('back-button');
    expect(backButton).toBeNull();
  });

  test('avatar click', () => {
    const onAvatarClick = jest.fn();
    render(
      <HeaderSmallAvatar
        onBackClick={() => {}}
        avatarProps={{
          type: 'profile',
          onAvatarClick,
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        avatarImagePosition={HeaderAvatarImagePosition.TRAILING}
      />
    );
    const avatarImage = screen.getByTestId('avatar-profile-container');
    fireEvent.click(avatarImage);
    expect(onAvatarClick).toHaveBeenCalled();
  });

  test('trailing icons', () => {
    render(
      <HeaderSmallAvatar
        onBackClick={() => {}}
        TrailingIcons={[<InfoIcon />, <InfoIcon />]}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        avatarImagePosition={HeaderAvatarImagePosition.TRAILING}
      />
    );
    const iconOne = screen.getByTestId('icon-0');
    const iconTwo = screen.getByTestId('icon-1');
    expect(iconOne).toBeInTheDocument();
    expect(iconTwo).toBeInTheDocument();
  });
});

describe('Test Header Regular Avatar', () => {
  test('present', async () => {
    render(
      <HeaderRegularAvatar
        onBackClick={() => {}}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        title="Title"
      />
    );
    await waitFor(() => {
      const headerRegularAvatar = screen.getByTestId('header-regular-avatar');
      expect(headerRegularAvatar).toBeInTheDocument();
    });
  });

  test('defaults', () => {
    render(
      //@ts-ignore
      <HeaderRegularAvatar type="regular-avatar" />
    );
    const headerRegularAvatar = screen.getByTestId('header-regular-avatar');
    expect(headerRegularAvatar).toBeInTheDocument();
  });

  test('title present', () => {
    render(
      <HeaderRegularAvatar
        onBackClick={() => {}}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        title="Title"
      />
    );
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Title');
  });

  test('sub-title present', () => {
    render(
      <HeaderRegularAvatar
        onBackClick={() => {}}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        title="Title"
        subTitle="Subtitle"
      />
    );
    const subTitle = screen.getByTestId('sub-title');
    expect(subTitle).toBeInTheDocument();
    expect(subTitle).toHaveTextContent('Subtitle');
  });

  test('title icon present', () => {
    render(
      <HeaderRegularAvatar
        onBackClick={() => {}}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        title="Title"
        subTitle="Subtitle"
        TitleIcon={<InfoIcon />}
      />
    );
    const titleIcon = screen.getByTestId('title-icon');
    expect(titleIcon).toBeInTheDocument();
  });

  test('back button click', () => {
    const onBackClick = jest.fn();
    render(
      <HeaderRegularAvatar
        onBackClick={onBackClick}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        title="Title"
      />
    );
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    expect(onBackClick).toHaveBeenCalled();
  });

  test('avatar click', () => {
    const onAvatarClick = jest.fn();
    render(
      <HeaderRegularAvatar
        onBackClick={() => {}}
        avatarProps={{
          type: 'profile',
          onAvatarClick,
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        title="Title"
      />
    );
    const avatarImage = screen.getByTestId('avatar-profile-container');
    fireEvent.click(avatarImage);
    expect(onAvatarClick).toHaveBeenCalled();
  });

  test('trailing icons', () => {
    render(
      <HeaderRegularAvatar
        onBackClick={() => {}}
        TrailingIcons={[<InfoIcon />, <InfoIcon />]}
        avatarProps={{
          type: 'profile',
          avatarProfile: {
            profileType: 'pic',
            profileContent: 'img',
          },
        }}
        title="Title"
      />
    );
    const iconOne = screen.getByTestId('icon-0');
    const iconTwo = screen.getByTestId('icon-1');
    expect(iconOne).toBeInTheDocument();
    expect(iconTwo).toBeInTheDocument();
  });
});

describe('Test Header Search', () => {
  test('present', async () => {
    render(
      <HeaderSearch
        onBackClick={() => {}}
        searchProps={{
          onChange: () => {},
          onClear: () => {},
        }}
      />
    );
    await waitFor(() => {
      const headerSearch = screen.getByTestId('header-search');
      expect(headerSearch).toBeInTheDocument();
    });
  });

  test('defaults', () => {
    render(
      //@ts-ignore
      <HeaderSearch />
    );
    const headerSearch = screen.getByTestId('header-search');
    expect(headerSearch).toBeInTheDocument();
  });

  test('back button hidden', () => {
    render(
      <HeaderSearch
        showBack={false}
        searchProps={{
          onChange: () => {},
          onClear: () => {},
        }}
      />
    );
    const backButton = screen.queryByTestId('back-button');
    expect(backButton).toBeNull();
  });

  test('back button click', () => {
    const onBackClick = jest.fn();
    render(
      <HeaderSearch
        onBackClick={onBackClick}
        searchProps={{
          onChange: () => {},
          onClear: () => {},
        }}
      />
    );
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    expect(onBackClick).toHaveBeenCalled();
  });

  test('onChange', () => {
    const onChange = jest.fn();
    render(
      <HeaderSearch
        onBackClick={() => {}}
        searchProps={{
          onChange,
          onClear: () => {},
        }}
      />
    );
    const searchField = screen.getByTestId('search-field');
    userEvent.type(searchField, 'Paytm');
    jest.runAllTimers();
    expect(onChange).toHaveBeenCalledWith('Paytm');
  });

  test('onClear', () => {
    const onClear = jest.fn();
    render(
      <HeaderSearch
        onBackClick={() => {}}
        searchProps={{
          onChange: () => {},
          onClear,
        }}
      />
    );
    const clearIcon = screen.getByTestId('clear-icon');
    fireEvent.mouseDown(clearIcon);
    expect(onClear).toHaveBeenCalled();
  });

  test('trailing icons', () => {
    render(
      <HeaderSearch
        onBackClick={() => {}}
        TrailingIcons={[<InfoIcon />]}
        searchProps={{
          onChange: () => {},
          onClear: () => {},
        }}
      />
    );
    const iconOne = screen.getByTestId('icon-0');
    expect(iconOne).toBeInTheDocument();
  });
});
