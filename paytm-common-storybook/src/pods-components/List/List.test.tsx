import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import List from "./List";
import ListItem from "./ListItem";
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg"
import avatarImage from "../../assets/img/avatar.png";
import { Checked } from "../Checkbox/Checkbox.types";

describe("Test List", () => {
  test("is present", () => {
    render(
      <List>
        <ListItem 
          id="1"
          primary="Primary One"
          onClick={() => {}} 
        />
      </List>
    );
    const container = screen.getByTestId("list-item-container");
    expect(container).toBeInTheDocument();
  });

  test("primary present", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" onClick={() => {}} />
      </List>
    );
    const primaries = screen.getAllByTestId("primary");
    expect(primaries).toHaveLength(3);
    expect(primaries[0]).toHaveTextContent("Primary One")
    expect(primaries[1]).toHaveTextContent("Primary Two")
    expect(primaries[2]).toHaveTextContent("Primary Three")
  });

  test("secondary present", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" secondary="Secondary One" onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" secondary="Secondary Two" onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" secondary="Secondary Three" onClick={() => {}} />
      </List>
    );
    const secondaries = screen.getAllByTestId("secondary");
    expect(secondaries).toHaveLength(3);
    expect(secondaries[0]).toHaveTextContent("Secondary One")
    expect(secondaries[1]).toHaveTextContent("Secondary Two")
    expect(secondaries[2]).toHaveTextContent("Secondary Three")
  });

  test("tertiary present", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" secondary="Secondary One" tertiary="Tertiary One" onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" secondary="Secondary Two" tertiary="Tertiary Two" onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" secondary="Secondary Three" tertiary="Tertiary Three" onClick={() => {}} />
      </List>
    );
    const tertiaries = screen.getAllByTestId("tertiary");
    expect(tertiaries).toHaveLength(3);
    expect(tertiaries[0]).toHaveTextContent("Tertiary One")
    expect(tertiaries[1]).toHaveTextContent("Tertiary Two")
    expect(tertiaries[2]).toHaveTextContent("Tertiary Three")
  });

  test("primary icon present", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" PrimaryIcon={<InfoIcon />} onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" PrimaryIcon={<InfoIcon />} onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" PrimaryIcon={<InfoIcon />} onClick={() => {}} />
      </List>
    );
    const primaryIcons = screen.getAllByTestId("primary-icon");
    expect(primaryIcons).toHaveLength(3);
  });

  test("tertiary icon present", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" tertiary="Tertiary One" TertiaryIcons={[<InfoIcon />]} onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" tertiary="Tertiary Two" TertiaryIcons={[<InfoIcon />]} onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" tertiary="Tertiary Three" TertiaryIcons={[<InfoIcon />]} onClick={() => {}} />
      </List>
    );
    const tertiaryIcons = screen.getAllByTestId("tertiary-icon");
    expect(tertiaryIcons).toHaveLength(3);
  });

  test("tertiary icon not present without tertiary", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" TertiaryIcons={[<InfoIcon />]} onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" TertiaryIcons={[<InfoIcon />]} onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" TertiaryIcons={[<InfoIcon />]} onClick={() => {}} />
      </List>
    );
    const tertiaryIcons = screen.queryAllByTestId("tertiary-icon");
    expect(tertiaryIcons).toHaveLength(0)
  });

  test("max 2 tertiary icon per option", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" tertiary="Tertiary One" TertiaryIcons={[<InfoIcon />, <InfoIcon />, <InfoIcon />, <InfoIcon />]} onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" tertiary="Tertiary Two" TertiaryIcons={[<InfoIcon />, <InfoIcon />, <InfoIcon />, <InfoIcon />]} onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" tertiary="Tertiary Three" TertiaryIcons={[<InfoIcon />, <InfoIcon />, <InfoIcon />, <InfoIcon />]} onClick={() => {}} />
      </List>
    );
    const tertiaryIcons = screen.getAllByTestId("tertiary-icon");
    expect(tertiaryIcons).toHaveLength(6);
  });

  test("leading icon present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          leading={{
            type: "icon",
            position: "center",
            Icon: <InfoIcon />
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          leading={{
            type: "icon",
            position: "center",
            Icon: <InfoIcon />
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          leading={{
            type: "icon",
            position: "center",
            Icon: <InfoIcon />
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const leadingIcons = screen.getAllByTestId("leading-icon");
    expect(leadingIcons).toHaveLength(3)
  });

  test("leading avatar present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          leading={{
            type: "avatar",
            position: "center",
            avatar: {
              type: "profile",
              avatarProfile: {
                imageURL: "image",
              }
            }
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          leading={{
            type: "avatar",
            position: "center",
            avatar: {
              type: "profile",
              avatarProfile: {
                imageURL: "image",
              }
            }
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          leading={{
            type: "avatar",
            position: "center",
            avatar: {
              type: "profile",
              avatarProfile: {
                imageURL: "image",
              }
            }
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const leadingAvatars = screen.getAllByTestId("leading-avatar");
    expect(leadingAvatars).toHaveLength(3)
  });

  test("leading avatar logo present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          leading={{
            type: "avatar",
            position: "center",
            avatar: {
              type: "logo",
              avatarLogo: {
                image: avatarImage
              }
            }
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          leading={{
            type: "avatar",
            position: "center",
            avatar: {
              type: "logo",
              avatarLogo: {
                image: avatarImage
              }
            }
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          leading={{
            type: "avatar",
            position: "center",
            avatar: {
              type: "logo",
              avatarLogo: {
                image: avatarImage
              }
            }
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const leadingAvatars = screen.getAllByTestId("leading-avatar");
    expect(leadingAvatars).toHaveLength(3);
  });

  test("leading checkbox present", () => {
    const checkboxProps = {
      id: "1",
      checked: "false" as Checked,
      onChange: () => {},
      label: "Checkbox"
    };
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          leading={{
            type: "checkbox",
            position: "center",
            checkbox: checkboxProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          leading={{
            type: "checkbox",
            position: "center",
            checkbox: checkboxProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          leading={{
            type: "checkbox",
            position: "center",
            checkbox: checkboxProps
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const leadingCheckboxes = screen.getAllByTestId("leading-checkbox");
    expect(leadingCheckboxes).toHaveLength(3)
  });

  test("leading radio present", () => {
    const radioProps = {
      checked: false,
      label: "Radio",
      name: "",
      onChecked: function (e: any) {},
      value: ""
    };
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          leading={{
            type: "radio",
            position: "center",
            radio: radioProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          leading={{
            type: "radio",
            position: "center",
            radio: radioProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          leading={{
            type: "radio",
            position: "center",
            radio: radioProps
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const leadingRadios = screen.getAllByTestId("leading-radio");
    expect(leadingRadios).toHaveLength(3)
  });

  test("trailing not present", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" onClick={() => {}} />
      </List>
    );
    const trailingSection = screen.queryByTestId("trailing-section");
    expect(trailingSection).toBeNull();
  });

  test("trailing badge present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "badge",
            position: "center",
            badge: {
              label: "Label 1",
              context: "primary"
            }
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "badge",
            position: "center",
            badge: {
              label: "Label 2",
              context: "primary"
            }
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "badge",
            position: "center",
            badge: {
              label: "Label 3",
              context: "primary"
            }
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingBadges = screen.getAllByTestId("trailing-badge");
    expect(trailingBadges).toHaveLength(3)
    expect(trailingBadges[0]).toHaveTextContent("Label 1")
    expect(trailingBadges[1]).toHaveTextContent("Label 2")
    expect(trailingBadges[2]).toHaveTextContent("Label 3")
  });

  test("trailing button present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "button",
            position: "center",
            button: {
              label: "Button 1",
              onClick: () => {}
            }
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "button",
            position: "center",
            button: {
              label: "Button 2",
              onClick: () => {}
            }
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "button",
            position: "center",
            button: {
              label: "Button 3",
              onClick: () => {}
            }
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingButtons = screen.getAllByTestId("trailing-button");
    expect(trailingButtons).toHaveLength(3)
    expect(trailingButtons[0]).toHaveTextContent("Button 1")
    expect(trailingButtons[1]).toHaveTextContent("Button 2")
    expect(trailingButtons[2]).toHaveTextContent("Button 3")
  });

  test("trailing checkbox present", () => {
    const checkboxProps = {
      id: "1",
      checked: "false" as Checked,
      onChange: () => {},
      label: "Checkbox"
    };
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "checkbox",
            position: "center",
            checkbox: checkboxProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "checkbox",
            position: "center",
            checkbox: checkboxProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "checkbox",
            position: "center",
            checkbox: checkboxProps
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingCheckboxes = screen.getAllByTestId("trailing-checkbox");
    expect(trailingCheckboxes).toHaveLength(3)
  });

  test("trailing radio present", () => {
    const radioProps = {
      checked: false,
      label: "Radio",
      name: "name",
      onChecked: () => {},
      value: "value"
    };
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "radio",
            position: "center",
            radio: radioProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "radio",
            position: "center",
            radio: radioProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "radio",
            position: "center",
            radio: radioProps
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingRadios = screen.getAllByTestId("trailing-radio");
    expect(trailingRadios).toHaveLength(3)
  });

  test("trailing switch present", () => {
    const switchProps = {
      active: false,
      onToggle: () => {}
    };
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "switch",
            position: "center",
            switch: switchProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "switch",
            position: "center",
            switch: switchProps
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "switch",
            position: "center",
            switch: switchProps
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingSwitches = screen.getAllByTestId("trailing-switch");
    expect(trailingSwitches).toHaveLength(3)
  });

  test("trailing link present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "link",
            position: "center",
            Link: <a>Click here! 1</a>,
            LinkIcon: <InfoIcon />
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "link",
            position: "center",
            Link: <a>Click here! 2</a>,
            LinkIcon: <InfoIcon />
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "link",
            position: "center",
            Link: <a>Click here! 3</a>,
            LinkIcon: <InfoIcon />
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingLinks = screen.getAllByTestId("trailing-link");
    expect(trailingLinks).toHaveLength(3)
    expect(trailingLinks[0]).toHaveTextContent("Click here! 1")
    expect(trailingLinks[1]).toHaveTextContent("Click here! 2")
    expect(trailingLinks[2]).toHaveTextContent("Click here! 3")
  });

  test("onclick", () => {
    const onClick = jest.fn();
    render(
      <List>
        <ListItem id="1" primary="Primary One" onClick={onClick} />
        <ListItem id="2" primary="Primary Two" onClick={onClick} />
        <ListItem id="3" primary="Primary Three" onClick={onClick} />
      </List>
    );
    const item1 = screen.getByTestId("list-item-1")
    fireEvent.click(item1)
    expect(onClick).toHaveBeenCalledWith("1")
  });

  test("separator present by default", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" onClick={() => {}} />
      </List>
    );
    const separators = screen.getAllByTestId("separator")
    expect(separators).toHaveLength(3)
  });

  test("separator hidden", () => {
    render(
      <List >
        <ListItem id="1" primary="Primary One" onClick={() => {}} separator={false}/>
        <ListItem id="2" primary="Primary Two" onClick={() => {}} separator={false}/>
        <ListItem id="3" primary="Primary Three" onClick={() => {}} separator={false} />
      </List>
    );
    const separators = screen.queryAllByTestId("separator")
    expect(separators).toHaveLength(0)
  });

  test("separator hidden for only last item", () => {
    render(
      <List>
        <ListItem id="1" primary="Primary One" onClick={() => {}} />
        <ListItem id="2" primary="Primary Two" onClick={() => {}} />
        <ListItem id="3" primary="Primary Three" onClick={() => {}} separator={false}/>
      </List>
    );
    const separators = screen.getAllByTestId("separator")
    expect(separators).toHaveLength(2)
  });

  test("trailing icon present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "icon",
            position: "center",
            Icon: <InfoIcon />
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "icon",
            position: "center",
            Icon: <InfoIcon />
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "icon",
            position: "center",
            Icon: <InfoIcon />
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingIcons = screen.getAllByTestId("trailing-icon");
    expect(trailingIcons).toHaveLength(3)
  });

  test("trailing avatar present", () => {
    render(
      <List>
        <ListItem
          id="1"
          primary="Primary One"
          secondary="Secondary One"
          trailing={{
            type: "avatar",
            size: "regular",
            avatar: {
              type: "profile",
              avatarProfile: { imageURL: avatarImage },
            },
          }}
          onClick={() => {}}
        />
        <ListItem
          id="2"
          primary="Primary Two"
          secondary="Secondary Two"
          trailing={{
            type: "avatar",
            avatar: {
              type: "initials",
              avatarInitials: { initials: "AB" },
            },
          }}
          onClick={() => {}}
        />
        <ListItem
          id="3"
          primary="Primary Three"
          trailing={{
            type: "avatar",
            size: "small",
            avatar: {
              type: "profile",
              avatarProfile: { imageURL: avatarImage },
            },
          }}
          onClick={() => {}}
        />
</List>
    );
    const trailingAvatars = screen.getAllByTestId("trailing-avatar");
    expect(trailingAvatars).toHaveLength(3);
  });

  test("trailing meta present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "meta",
            position: "center",
            meta: "Meta 1"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "meta",
            position: "center",
            meta: "Meta 2"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "meta",
            position: "center",
            meta: "Meta 3"
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingMetas = screen.getAllByTestId("trailing-meta");
    expect(trailingMetas).toHaveLength(3)
    expect(trailingMetas[0]).toHaveTextContent("Meta 1")
    expect(trailingMetas[1]).toHaveTextContent("Meta 2")
    expect(trailingMetas[2]).toHaveTextContent("Meta 3")
  });

  test("trailing detail present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "detail",
            position: "center",
            detail: "Detail 1"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "detail",
            position: "center",
            detail: "Detail 2"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "detail",
            position: "center",
            detail: "Detail 3"
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingDetails = screen.getAllByTestId("trailing-detail");
    expect(trailingDetails).toHaveLength(3)
    expect(trailingDetails[0]).toHaveTextContent("Detail 1")
    expect(trailingDetails[1]).toHaveTextContent("Detail 2")
    expect(trailingDetails[2]).toHaveTextContent("Detail 3")
  });

  test("trailing legend present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "legend",
            position: "center",
            legend: "Legend 1"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "legend",
            position: "center",
            legend: "Legend 2"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "legend",
            position: "center",
            legend: "Legend 3"
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingLegends = screen.getAllByTestId("trailing-legend");
    expect(trailingLegends).toHaveLength(3)
    expect(trailingLegends[0]).toHaveTextContent("Legend 1")
    expect(trailingLegends[1]).toHaveTextContent("Legend 2")
    expect(trailingLegends[2]).toHaveTextContent("Legend 3")
  });

  test("trailing status present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "status",
            position: "center",
            statusMode: "failiure",
            status: "Failed"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "status",
            position: "center",
            statusMode: "success",
            status: "Success"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "status",
            position: "center",
            statusMode: "warning",
            status: "Pending"
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingStatusTexts = screen.getAllByTestId("trailing-status-text");
    expect(trailingStatusTexts).toHaveLength(3)
    expect(trailingStatusTexts[0]).toHaveTextContent("Failed")
    expect(trailingStatusTexts[1]).toHaveTextContent("Success")
    expect(trailingStatusTexts[2]).toHaveTextContent("Pending")
  });

  test("trailing meta-with-badge present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "meta-with-badge",
            position: "center",
            badge: {
              label: "Label 1",
              context: "negative",
              shape: "count"
            },
            meta: "Meta 1"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "meta-with-badge",
            position: "center",
            badge: {
              label: "Label 2",
              context: "negative",
              shape: "count"
            },
            meta: "Meta 2"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "meta-with-badge",
            position: "center",
            badge: {
              label: "Label 3",
              context: "negative",
              shape: "count"
            },
            meta: "Meta 3"
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingMetas = screen.getAllByTestId("trailing-meta");
    expect(trailingMetas).toHaveLength(3)
    expect(trailingMetas[0]).toHaveTextContent("Meta 1")
    expect(trailingMetas[1]).toHaveTextContent("Meta 2")
    expect(trailingMetas[2]).toHaveTextContent("Meta 3")
    const trailingBadges = screen.getAllByTestId("trailing-badge");
    expect(trailingBadges).toHaveLength(3)
    expect(trailingBadges[0]).toHaveTextContent("Label 1")
    expect(trailingBadges[1]).toHaveTextContent("Label 2")
    expect(trailingBadges[2]).toHaveTextContent("Label 3")
  });

  test("trailing detail-with-meta present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "detail-with-meta",
            position: "center",
            detail: "Detail 1",
            meta: "Meta 1"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "detail-with-meta",
            position: "center",
            detail: "Detail 2",
            meta: "Meta 2"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "detail-with-meta",
            position: "center",
            detail: "Detail 3",
            meta: "Meta 3"
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingMetas = screen.getAllByTestId("trailing-meta");
    expect(trailingMetas).toHaveLength(3)
    expect(trailingMetas[0]).toHaveTextContent("Meta 1")
    expect(trailingMetas[1]).toHaveTextContent("Meta 2")
    expect(trailingMetas[2]).toHaveTextContent("Meta 3")
    const trailingDetails = screen.getAllByTestId("trailing-detail");
    expect(trailingDetails).toHaveLength(3)
    expect(trailingDetails[0]).toHaveTextContent("Detail 1")
    expect(trailingDetails[1]).toHaveTextContent("Detail 2")
    expect(trailingDetails[2]).toHaveTextContent("Detail 3")
  });

  test("trailing legend-with-status present", () => {
    render(
      <List>
        <ListItem 
          id="1" 
          primary="Primary One" 
          trailing={{
            type: "legend-with-status",
            position: "center",
            legend: "Legend 1",
            statusMode: "failiure",
            status: "Failed"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="2" 
          primary="Primary Two" 
          trailing={{
            type: "legend-with-status",
            position: "center",
            legend: "Legend 2",
            statusMode: "success",
            status: "Success"
          }}
          onClick={() => {}} 
        />
        <ListItem 
          id="3" 
          primary="Primary Three" 
          trailing={{
            type: "legend-with-status",
            position: "center",
            legend: "Legend 3",
            statusMode: "warning",
            status: "Pending"
          }}
          onClick={() => {}} 
        />
      </List>
    );
    const trailingLegends = screen.getAllByTestId("trailing-legend");
    expect(trailingLegends).toHaveLength(3)
    expect(trailingLegends[0]).toHaveTextContent("Legend 1")
    expect(trailingLegends[1]).toHaveTextContent("Legend 2")
    expect(trailingLegends[2]).toHaveTextContent("Legend 3")
    const trailingStatusTexts = screen.getAllByTestId("trailing-status-text");
    expect(trailingStatusTexts).toHaveLength(3)
    expect(trailingStatusTexts[0]).toHaveTextContent("Failed")
    expect(trailingStatusTexts[1]).toHaveTextContent("Success")
    expect(trailingStatusTexts[2]).toHaveTextContent("Pending")
  });

  test("renders empty list", () => {
    render(<List>{[]}</List>);
    const container = screen.getByTestId("list-item-container");
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  test("applies custom class", () => {
    const customClass = "custom-list-class";
    render(<List customClass={customClass}>{[]}</List>);
    const container = screen.getByTestId("list-item-container");
    expect(container).toHaveClass(customClass);
  });

  test("renders multiple children correctly", () => {
    render(
      <List>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </List>
    );
    const container = screen.getByTestId("list-item-container");
    const children = container.children;
    expect(children).toHaveLength(3);
    expect(screen.getByTestId("child-1")).toHaveTextContent("Child 1");
    expect(screen.getByTestId("child-2")).toHaveTextContent("Child 2");
    expect(screen.getByTestId("child-3")).toHaveTextContent("Child 3");
  });

  test("handles null children", () => {
    render(
      <List>
        {null}
        <div data-testid="child">Valid Child</div>
        {undefined}
      </List>
    );
    const container = screen.getByTestId("list-item-container");
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(container.children).toHaveLength(1);
  });
});
