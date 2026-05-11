import React from "react";
import {render, screen} from "@testing-library/react"

import SectionHeader from "./SectionHeader"
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg";

describe("Test SectionHeader", () => {
  test("is present", () => {
    render((
      <SectionHeader
        size="large"
        title="Title"
      />
    ));
    const sectionHeaderContainer = screen.getByTestId("section-header-container")
    expect(sectionHeaderContainer).toBeInTheDocument();
  })

  test("default", () => {
    render((
      //@ts-ignore
      <SectionHeader
      />
    ));
    const sectionHeaderContainer = screen.getByTestId("section-header-container")
    expect(sectionHeaderContainer).toBeInTheDocument();
    expect(sectionHeaderContainer).toHaveClass("extra-large")
    expect(sectionHeaderContainer).not.toHaveClass("offset")
  })

  test("title is present", () => {
    render((
      <SectionHeader
        size="large"
        title="Title"
      />
    ));
    const title = screen.getByTestId("title")
    expect(title).toHaveTextContent("Title")
  })

  test("sub-title is present", () => {
    render((
      <SectionHeader
        size="large"
        title="Title"
        subTitle="Subtitle"
      />
    ));
    const subTitle = screen.getByTestId("sub-title")
    expect(subTitle).toHaveTextContent("Subtitle")
  })

  test("large", () => {
    render((
      <SectionHeader
        size="large"
        title="Title"
      />
    ));
    const sectionHeaderContainer = screen.getByTestId("section-header-container")
    expect(sectionHeaderContainer).toHaveClass("large")
  })

  test("small", () => {
    render((
      <SectionHeader
        size="small"
        title="Title"
      />
    ));
    const sectionHeaderContainer = screen.getByTestId("section-header-container")
    expect(sectionHeaderContainer).toHaveClass("small")
  })

  test("offset", () => {
    render((
      <SectionHeader
        size="small"
        title="Title"
        offset
      />
    ));
    const sectionHeaderContainer = screen.getByTestId("section-header-container")
    expect(sectionHeaderContainer).toHaveClass("offset")
  })

  test("trailing icons", () => {
    render(
      <SectionHeader
        size="large"
        title="Title"
        subTitle="Subtitle"
        TrailingIcons={[<InfoIcon />, <InfoIcon />]}
      />
    );
    const iconOne = screen.getByTestId("icon-0");
    const iconTwo = screen.getByTestId("icon-1");
    expect(iconOne).toBeInTheDocument();
    expect(iconTwo).toBeInTheDocument();
  });

  test("trailing link", () => {
    render(
      <SectionHeader
        size="large"
        title="Title"
        subTitle="Subtitle"
        TrailingLink={<a>One</a>}
      />
    );
    const link = screen.getByTestId("link");
    expect(link).toBeInTheDocument();
  });
  
  test("trailing icons preferred over link", () => {
    render(
      <SectionHeader
        size="large"
        title="Title"
        subTitle="Subtitle"
        TrailingIcons={[<InfoIcon />, <InfoIcon />]}
        TrailingLink={<a>One</a>}
      />
    );
    const iconOne = screen.getByTestId("icon-0");
    const iconTwo = screen.getByTestId("icon-1");
    expect(iconOne).toBeInTheDocument();
    expect(iconTwo).toBeInTheDocument();
    const link = screen.queryByTestId("link");
    expect(link).toBeNull();
  });

  test("offset without subtitle has extra padding", () => {
    render(
      <SectionHeader
        size="large"
        title="Title"
        offset
        TrailingLink={<a>One</a>}
      />
    );
    const sectionHeaderContainer = screen.getByTestId("section-header-container")
    expect(sectionHeaderContainer).toHaveClass("extraVerticalPadding")
  });
  
  test("medium size", () => {
    render((
      <SectionHeader
        size="medium"
        title="Title"
      />
    ));
    const sectionHeaderContainer = screen.getByTestId("section-header-container")
    expect(sectionHeaderContainer).toHaveClass("medium")
  })

  test("trailing text", () => {
    render(
      <SectionHeader
        size="large"
        title="Title"
        TrailingText={<span>Status Text</span>}
      />
    );
    const text = screen.getByTestId("text");
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("Status Text")
  });

  test("custom class", () => {
    render(
      <SectionHeader
        size="large"
        title="Title"
        customClass="custom-header"
      />
    );
    const sectionHeaderContainer = screen.getByTestId("section-header-container")
    expect(sectionHeaderContainer).toHaveClass("custom-header");
  });

  test("respects MAX_TRAILING_ITEMS limit", () => {
    render(
      <SectionHeader
        size="large"
        title="Title"
        TrailingIcons={[<InfoIcon key="1" />, <InfoIcon key="2" />, <InfoIcon key="3" />]}
      />
    );
    const iconOne = screen.getByTestId("icon-0");
    const iconTwo = screen.getByTestId("icon-1");
    expect(iconOne).toBeInTheDocument();
    expect(iconTwo).toBeInTheDocument();
    // Third icon should not be rendered
    expect(screen.queryByTestId("icon-2")).toBeNull();
  });

  test("accessibility attributes", () => {
    render(
      <SectionHeader
        size="large"
        title="Title"
        subTitle="Subtitle"
      />
    );
    const title = screen.getByTestId("title");
    const subTitle = screen.getByTestId("sub-title");
    
    expect(title).toHaveAttribute("role", "heading");
    expect(title).toHaveAttribute("aria-level", "2");
    expect(subTitle).toHaveAttribute("role", "note");
  });

  test("empty trailing sections render nothing", () => {
    render(
      <SectionHeader
        size="large"
        title="Title"
        TrailingIcons={[]}
      />
    );
    
    expect(screen.queryByTestId("icon-0")).toBeNull();
    expect(screen.queryByTestId("link")).toBeNull();
    expect(screen.queryByTestId("text")).toBeNull();
  });
});