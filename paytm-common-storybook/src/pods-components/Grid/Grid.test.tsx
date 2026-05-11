import React from "react";
import {render, screen} from "@testing-library/react"

import Grid from "./Grid"
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg"

describe("Test Grid-Category", () => {
  test("is present", () => {
    render((
      <Grid 
        type="category"
        gridCategory={{
          items: [{
            Icon: <InfoIcon />,
            label: "Label 1"
          }]
        }}
      />
    ));
    const container = screen.getByTestId("grid-category-container")
    expect(container).toBeInTheDocument();
  })

  test("defaults", () => {
    render((
      // @ts-ignore
      <Grid />
    ));
    const container = screen.getByTestId("grid-category-container")
    expect(container).toBeInTheDocument();
    const icons = screen.queryAllByTestId("grid-icon")
    expect(icons).toHaveLength(0)
    const labels = screen.queryAllByTestId("grid-label")
    expect(labels).toHaveLength(0)
  })

  test("label default", () => {
    render((
      <Grid 
        type="category"
        gridCategory={{
          //@ts-ignore
          items: [{
            Icon: <InfoIcon />
          }]
        }}
      />
    ));
    const icons = screen.queryAllByTestId("grid-icon")
    expect(icons).toHaveLength(1)
    const labels = screen.queryAllByTestId("grid-label")
    expect(labels).toHaveLength(1)
    expect(labels[0]).toHaveTextContent("")
  })

  test("contents present", () => {
    render((
      <Grid 
        type="category"
        gridCategory={{
          items: [{
            Icon: <InfoIcon />,
            label: "Label 1"
          },
          {
            Icon: <InfoIcon />,
            label: "Label 2"
          }]
        }}
      />
    ));
    const icons = screen.getAllByTestId("grid-icon")
    expect(icons).toHaveLength(2)
    const labels = screen.getAllByTestId("grid-label")
    expect(labels).toHaveLength(2)
    expect(labels[0]).toHaveTextContent("Label 1")
    expect(labels[1]).toHaveTextContent("Label 2")
  })
})


describe("Test Grid-Icon", () => {
  test("is present", () => {
    render((
      <Grid 
        type="icon"
        gridIcon={{
          items: [{
            Icon: <InfoIcon />,
            label: "Label 1"
          }]
        }}
      />
    ));
    const container = screen.getByTestId("grid-icon-container")
    expect(container).toBeInTheDocument();
  })

  test("defaults", () => {
    render((
      // @ts-ignore
      <Grid 
        type="icon"
      />
    ));
    const container = screen.getByTestId("grid-icon-container")
    expect(container).toBeInTheDocument();
    const icons = screen.queryAllByTestId("grid-icon")
    expect(icons).toHaveLength(0)
    const labels = screen.queryAllByTestId("grid-label")
    expect(labels).toHaveLength(0)
  })

  test("label default", () => {
    render((
      <Grid 
        type="icon"
        gridIcon={{
          //@ts-ignore
          items: [{
            Icon: <InfoIcon />
          }]
        }}
      />
    ));
    const icons = screen.queryAllByTestId("grid-icon")
    expect(icons).toHaveLength(1)
    const labels = screen.queryAllByTestId("grid-label")
    expect(labels).toHaveLength(1)
    expect(labels[0]).toHaveTextContent("")
  })

  test("contents present", () => {
    render((
      <Grid 
        type="icon"
        gridIcon={{
          items: [{
            Icon: <InfoIcon />,
            label: "Label 1"
          },
          {
            Icon: <InfoIcon />,
            label: "Label 2"
          }]
        }}
      />
    ));
    const icons = screen.getAllByTestId("grid-icon")
    expect(icons).toHaveLength(2)
    const labels = screen.getAllByTestId("grid-label")
    expect(labels).toHaveLength(2)
    expect(labels[0]).toHaveTextContent("Label 1")
    expect(labels[1]).toHaveTextContent("Label 2")
  })
})

describe("Test Grid-Avatar", () => {
  test("is present", () => {
    render((
      <Grid 
        type="avatar"
        gridAvatar={{
          items: [{
            avatarProps: {
              type: "profile",
              avatarProfile: {
                profileType: "initials",
                profileContent: "vs"
              }
            },
            label: "Label 1"
          }]
        }}
      />
    ));
    const container = screen.getByTestId("grid-avatar-container")
    expect(container).toBeInTheDocument();
  })

  test("defaults", () => {
    render((
      // @ts-ignore
      <Grid 
        type="avatar"
      />
    ));
    const container = screen.getByTestId("grid-avatar-container")
    expect(container).toBeInTheDocument();
    const avatars = screen.queryAllByTestId("grid-avatar")
    expect(avatars).toHaveLength(0)
    const labels = screen.queryAllByTestId("grid-label")
    expect(labels).toHaveLength(0)
  })

  test("contents present", () => {
    render((
      <Grid 
        type="avatar"
        gridAvatar={{
          items: [{
            avatarProps: {
              type: "profile",
              avatarProfile: {
                profileType: "initials",
                profileContent: "vs"
              }
            },
            label: "Label 1"
          },
          {
            avatarProps: {
              type: "profile",
              avatarProfile: {
                profileType: "initials",
                profileContent: "vs"
              }
            },
            label: "Label 2"
          }]
        }}
      />
    ));
    const avatars = screen.getAllByTestId("grid-avatar")
    expect(avatars).toHaveLength(2)
    const labels = screen.getAllByTestId("grid-label")
    expect(labels).toHaveLength(2)
    expect(labels[0]).toHaveTextContent("Label 1")
    expect(labels[1]).toHaveTextContent("Label 2")
  })
})