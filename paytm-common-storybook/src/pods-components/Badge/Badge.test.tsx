import React from "react";
import {render, screen} from "@testing-library/react"

import Badge from "./Badge";

describe("Test Badge", () => {

  test("is present", () => {
    render(
      <Badge
        context="primary" 
        label="label"
      />
    );
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveTextContent("label")
    expect(badge).toHaveClass("primary")
    expect(badge).toHaveClass("normal")
  })

  test("default", () => {
    render(
      //@ts-ignore
      <Badge
      />
    );
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveTextContent("")
    expect(badge).toHaveClass("primary")
    expect(badge).toHaveClass("normal")
  })

  test("muted", () => {
    render(
      <Badge
        context="notice" 
        label="label"
        muted
      />
    );
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveTextContent("label")
    expect(badge).toHaveClass("notice")
    expect(badge).toHaveClass("normal")
    expect(badge).toHaveClass("muted")
  })

  test("count", () => {
    render(
      <Badge
        context="positive" 
        label="2"
        shape="count"
      />
    );
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveTextContent("2")
    expect(badge).toHaveClass("positive")
    expect(badge).toHaveClass("count")
  })

  test("negative context", () => {
    render(
      <Badge
        context="negative" 
        label="Error"
      />
    );
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveTextContent("Error")
    expect(badge).toHaveClass("negative")
    expect(badge).toHaveClass("normal")
  })

  test("highlight context", () => {
    render(
      <Badge
        context="highlight" 
        label="New"
      />
    );
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveTextContent("New")
    expect(badge).toHaveClass("highlight")
    expect(badge).toHaveClass("normal")
  })

  test("dot shape", () => {
    render(
      <Badge
        context="primary" 
        label="Status"
        shape="dot"
      />
    );
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveTextContent("Status")
    expect(badge).toHaveClass("primary")
    expect(badge).toHaveClass("dot")
  })

  test("with leading icon", () => {
    const LeadingIcon = <span>🔔</span>
    render(
      <Badge
        context="primary" 
        label="Notifications"
        LeadingIcon={LeadingIcon}
      />
    );
    const badge = screen.getByTestId("badge")
    const leadingIcon = screen.getByTestId("leading-icon")
    expect(badge).toHaveTextContent("Notifications")
    expect(badge).toHaveClass("leadingIcon")
    expect(leadingIcon).toBeInTheDocument()
  })

  test("with trailing icon", () => {
    const TrailingIcon = <span>→</span>
    render(
      <Badge
        context="primary" 
        label="Click"
        TrailingIcon={TrailingIcon}
      />
    );
    const badge = screen.getByTestId("badge")
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(badge).toHaveTextContent("Click")
    expect(badge).toHaveClass("trailingIcon")
    expect(trailingIcon).toBeInTheDocument()
  })

  test("with custom class", () => {
    render(
      <Badge
        context="primary" 
        label="Custom"
        customClass="myCustomClass"
      />
    );
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveClass("myCustomClass")
  })

  test("muted with leading icon", () => {
    const LeadingIcon = <span>📌</span>
    render(
      <Badge
        context="notice" 
        label="Pinned"
        muted
        LeadingIcon={LeadingIcon}
      />
    );
    const badge = screen.getByTestId("badge")
    const leadingIcon = screen.getByTestId("leading-icon")
    expect(badge).toHaveClass("notice")
    expect(badge).toHaveClass("muted")
    expect(badge).toHaveClass("leadingIcon")
    expect(leadingIcon).toBeInTheDocument()
  })

})