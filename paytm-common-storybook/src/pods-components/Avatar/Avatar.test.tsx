import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";

import Avatar from "./Avatar";
import { InitialsColorType } from "./Avatar.types";
import avatarImage from "../../assets/img/avatar.png"
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg"
import { getInitialsColorClass, VALID_COLORS } from "./Avatar.utils";

const avatarInitialsColorVariants = VALID_COLORS.map((color) => ({
  color,
  className: getInitialsColorClass(color, "LV"),
  initials: "LV"
})).concat([{
  color: "random",
  className: getInitialsColorClass("random", "RV"),
  initials: "RV"
}]);


describe("Test Avatar-Profile", () => {
  test("is present", () => {
    render((
      <Avatar 
        type="profile"
        size="large"
        avatarProfile={{
          imageURL: avatarImage
        }}
      />
    ));

    const profileContainer = screen.getByTestId("avatar-profile-container")
    expect(profileContainer).toBeInTheDocument();
  })

  test("defaults", () => {
    render((
      //@ts-ignore
      <Avatar />
    ));

    const avatarProfile = screen.getByTestId("avatar-profile-container")
    expect(avatarProfile).toBeInTheDocument();
    expect(avatarProfile).toHaveClass("regular")
  })

  test("action icon is present", () => {
    render((
      <Avatar 
        type="profile"
        size="large"
        iconType="action"
        Icon={<InfoIcon />}
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const actionIcon = screen.getByTestId("action-icon")
    expect(actionIcon).toBeInTheDocument();
  })

  test("status icon is present", () => {
    render((
      <Avatar 
        type="profile"
        size="large"
        iconType="status"
        Icon={<InfoIcon />}
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const statusIcon = screen.getByTestId("status-icon")
    expect(statusIcon).toBeInTheDocument();
  })

  test("status icon is not present when action icon present", () => {
    render((
      <Avatar 
        type="profile"
        size="large"
        iconType="action"
        Icon={<InfoIcon />}
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const statusIcon = screen.queryByTestId("status-icon")
    expect(statusIcon).not.toBeInTheDocument();
    const actionIcon = screen.getByTestId("action-icon")
    expect(actionIcon).toBeInTheDocument();
  })

  test("action icon is not present when status icon present", () => {
    render((
      <Avatar 
        type="profile"
        size="large"
        iconType="status"
        Icon={<InfoIcon />}
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const actionIcon = screen.queryByTestId("action-icon")
    expect(actionIcon).not.toBeInTheDocument();
    const statusIcon = screen.getByTestId("status-icon")
    expect(statusIcon).toBeInTheDocument();
  })

  test("selected", () => {
    render((
      <Avatar 
        type="profile"
        size="large"
        selected={true}
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const avatarProfile = screen.getByTestId("avatar-profile-container")
    expect(avatarProfile).toHaveClass("selected");
    const selectedIcon = screen.getByTestId("selected-icon")
    expect(selectedIcon).toBeInTheDocument();
  })

  test("initials", () => {
    render((
      <Avatar 
        type="initials"
        size="large"
        selected={true}
        avatarInitials={{
          initials: "LV",
          initialsColor: "lavender"
        }}
      />
    ));

    const avatarProfile = screen.getByTestId("avatar-initials-container")
    expect(avatarProfile).toHaveClass("selected");
    const selectedIcon = screen.getByTestId("selected-icon")
    expect(selectedIcon).toBeInTheDocument();
  })

  test("initials with pastel color", () => {
    render((
      <Avatar 
        type="initials"
        size="regular"
        avatarInitials={{
          initials: "P1",
          initialsColor: "lavender"
        }}
      />
    ));

    const initialsSpan = screen.getByTestId("profile-initials");
    expect(initialsSpan).toHaveClass("lavender");
  });

  describe("getInitialsColorClass function", () => {
    test.each(avatarInitialsColorVariants)("applies correct class for $color", ({ color, className, initials }) => {
      render((
        <Avatar 
          type="initials"
          size="regular"
          avatarInitials={{
            initials,
            initialsColor: color as InitialsColorType
          }}
        />
      ));

      const initialsSpan = screen.getByTestId("profile-initials");
      if (color !== "random") {
        expect(initialsSpan).toHaveClass(className);
      }
    });

    test("returns empty string for invalid color", () => {
      render((
        <Avatar 
          type="initials"
          size="regular"
          avatarInitials={{
            initials: "AB",
            // @ts-ignore - Testing invalid input
            initialsColor: "InvalidColor"
          }}
        />
      ));

      const initialsSpan = screen.getByTestId("profile-initials");
      avatarInitialsColorVariants.forEach(({ color, className, initials }) => {
        expect(initialsSpan).not.toHaveClass(className);
      });
    });
  });

  test("avatar click", () => {
    const onAvatarClick =  jest.fn();
    render((
      <Avatar 
        type="profile"
        size="large"
        onAvatarClick={onAvatarClick}
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const avatarProfile = screen.getByTestId("avatar-profile-container")
    fireEvent.click(avatarProfile)
    expect(onAvatarClick).toHaveBeenCalled()
  })

  test("small", () => {
    render((
      <Avatar 
        type="profile"
        size="small"
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const avatarProfile = screen.getByTestId("avatar-profile-container")
    expect(avatarProfile).toHaveClass("small")
  })

  test("regular", () => {
    render((
      <Avatar 
        type="profile"
        size="regular"
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const avatarProfile = screen.getByTestId("avatar-profile-container")
    expect(avatarProfile).toHaveClass("regular")
  })

  test("large", () => {
    render((
      <Avatar 
        type="profile"
        size="large"
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const avatarProfile = screen.getByTestId("avatar-profile-container")
    expect(avatarProfile).toHaveClass("large")
  })

  test("extra-large", () => {
    render((
      <Avatar 
        type="profile"
        size="extra-large"
        avatarProfile={{
          imageURL: avatarImage,
        }}
      />
    ));

    const avatarProfile = screen.getByTestId("avatar-profile-container")
    expect(avatarProfile).toHaveClass("extra-large")
  })

})

describe("Test Avatar-Logo", () => {
  test("is present", () => {
    render((
      <Avatar 
        type="logo"
        size="large"
        avatarLogo={{
          image: avatarImage
        }}
      />
    ));

    const logoContainer = screen.getByTestId("avatar-logo-container")
    expect(logoContainer).toBeInTheDocument();
  })

  test("status icon is present", () => {
    render((
      <Avatar 
        type="logo"
        size="large"
        iconType="status"
        Icon={<InfoIcon />}
        avatarLogo={{
          image: avatarImage,
        }}
      />
    ));

    const statusIcon = screen.getByTestId("status-icon")
    expect(statusIcon).toBeInTheDocument();
  })  

  test("selected", () => {
    render((
      <Avatar 
        type="logo"
        size="large"
        selected={true}
        avatarLogo={{
          image: avatarImage,
        }}
      />
    ));

    const avatarLogo = screen.getByTestId("avatar-logo-container")
    expect(avatarLogo).toHaveClass("selected");
    const selectedIcon = screen.getByTestId("selected-icon")
    expect(selectedIcon).toBeInTheDocument();
  })

  test("avatar click", () => {
    const onAvatarClick =  jest.fn();
    render((
      <Avatar 
        type="logo"
        size="large"
        onAvatarClick={onAvatarClick}
        avatarLogo={{
          image: avatarImage,
        }}
      />
    ));

    const avatarLogo = screen.getByTestId("avatar-logo-container")
    fireEvent.click(avatarLogo)
    expect(onAvatarClick).toHaveBeenCalled()
  })

  test("small", () => {
    render((
      <Avatar 
        type="logo"
        size="small"
        avatarLogo={{
          image: avatarImage,
        }}
      />
    ));

    const avatarLogo = screen.getByTestId("avatar-logo-container")
    expect(avatarLogo).toHaveClass("small")
  })

  test("regular", () => {
    render((
      <Avatar 
        type="logo"
        size="regular"
        avatarLogo={{
          image: avatarImage,
        }}
      />
    ));

    const avatarLogo = screen.getByTestId("avatar-logo-container")
    expect(avatarLogo).toHaveClass("regular")
  })

  test("large", () => {
    render((
      <Avatar 
        type="logo"
        size="large"
        avatarLogo={{
          image: avatarImage,
        }}
      />
    ));

    const avatarLogo = screen.getByTestId("avatar-logo-container")
    expect(avatarLogo).toHaveClass("large")
  })

  test("extra-large", () => {
    render((
      <Avatar 
        type="logo"
        size="extra-large"
        avatarLogo={{
          image: avatarImage,
        }}
      />
    ));

    const avatarLogo = screen.getByTestId("avatar-logo-container")
    expect(avatarLogo).toHaveClass("extra-large")
  })

  test("Outline", () => {
    render((
      <Avatar 
        type="logo"
        size="extra-large"
        avatarLogo={{
          image: avatarImage,
          outline: true
        }}
      />
    ));

    const logoImage = screen.getByTestId("logo-image")
    expect(logoImage).toHaveClass("outline")
  })

})

describe("Test Avatar-Icon", () => {
  test("is present", () => {
    render((
      <Avatar 
        type="icon"
        size="large"
        avatarIcon={{
          Icon: <InfoIcon />
        }}
      />
    ));

    const iconContainer = screen.getByTestId("avatar-icon-container")
    expect(iconContainer).toBeInTheDocument();
  })

  test("defaults", () => {
    render((
      //@ts-ignore
      <Avatar 
        type="icon"
      />
    ));

    const iconContainer = screen.getByTestId("avatar-icon-container")
    expect(iconContainer).toHaveClass("fill")
  })

  test("icon outline", () => {
    render((
      <Avatar 
        type="icon"
        size="large"
        avatarIcon={{
          outline: true,
          Icon: <InfoIcon />
        }}
      />
    ));

    const icon = screen.getByTestId("icon")
    expect(icon).toBeInTheDocument();
    const iconContainer = screen.getByTestId("avatar-icon-container")
    expect(iconContainer).toHaveClass("outline")
  })

  test("icon fill", () => {
    render((
      <Avatar 
        type="icon"
        size="large"
        avatarIcon={{
          Icon: <InfoIcon />
        }}
      />
    ));

    const icon = screen.getByTestId("icon")
    expect(icon).toBeInTheDocument();
    const iconContainer = screen.getByTestId("avatar-icon-container")
    expect(iconContainer).toHaveClass("fill")
  })

  test("avatar click", () => {
    const onAvatarClick =  jest.fn();
    render((
      <Avatar 
        type="icon"
        size="large"
        onAvatarClick={onAvatarClick}
        avatarIcon={{
          Icon: <InfoIcon />
        }}
      />
    ));

    const avatarIcon = screen.getByTestId("avatar-icon-container")
    fireEvent.click(avatarIcon)
    expect(onAvatarClick).toHaveBeenCalled()
  })

  test("small", () => {
    render((
      <Avatar 
        type="icon"
        size="small"
        avatarIcon={{
          Icon: <InfoIcon />
        }}
      />
    ));

    const avatarIcon = screen.getByTestId("avatar-icon-container")
    expect(avatarIcon).toHaveClass("small")
  })

  test("regular", () => {
    render((
      <Avatar 
        type="icon"
        size="regular"
        avatarIcon={{
          Icon: <InfoIcon />
        }}
      />
    ));

    const avatarIcon = screen.getByTestId("avatar-icon-container")
    expect(avatarIcon).toHaveClass("regular")
  })

  test("large", () => {
    render((
      <Avatar 
        type="icon"
        size="large"
        avatarIcon={{
          Icon: <InfoIcon />
        }}
      />
    ));

    const avatarIcon = screen.getByTestId("avatar-icon-container")
    expect(avatarIcon).toHaveClass("large")
  })

  test("extra-large", () => {
    render((
      <Avatar 
        type="icon"
        size="extra-large"
        avatarIcon={{
          Icon: <InfoIcon />
        }}
      />
    ));

    const avatarIcon = screen.getByTestId("avatar-icon-container")
    expect(avatarIcon).toHaveClass("extra-large")
  })

})