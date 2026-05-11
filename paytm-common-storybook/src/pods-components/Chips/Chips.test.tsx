import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Chips from "./Chips";

// Mock icon component for testing
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

describe("Chips Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    test("renders normal chip with default props", () => {
      render(<Chips type="normal" label="Default Chip" />);
      const chip = screen.getByTestId("normal");
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass("normal");
      expect(chip).toHaveClass("regular");
      expect(screen.getByText("Default Chip")).toBeInTheDocument();
    });

    test("renders offset chip", () => {
      render(<Chips type="offset" label="Offset Chip" />);
      const chip = screen.getByTestId("offset");
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass("offset");
    });
  });

  // Size Variants Tests
  describe("Size Variants", () => {
    test("renders regular size chip", () => {
      render(<Chips type="normal" label="Regular Chip" size="regular" />);
      const chip = screen.getByTestId("normal");
      expect(chip).toHaveClass("regular");
    });

    test("renders small size chip", () => {
      render(<Chips type="normal" label="Small Chip" size="small" />);
      const chip = screen.getByTestId("normal");
      expect(chip).toHaveClass("small");
    });
  });

  // State Tests
  describe("States", () => {
    test("renders selected chip", () => {
      render(<Chips type="normal" label="Selected Chip" selected />);
      const chip = screen.getByTestId("normal");
      expect(chip).toHaveClass("selected");
    });

    test("renders disabled chip", () => {
      render(<Chips type="normal" label="Disabled Chip" enabled={false} />);
      const chip = screen.getByTestId("normal");
      expect(chip).toHaveClass("disabled");
      expect(chip).toHaveAttribute("tabIndex", "-1");
    });

    test("renders dotted outline chip", () => {
      render(<Chips type="normal" label="Dotted Chip" dottedOutline />);
      const chip = screen.getByTestId("normal");
      expect(chip).toHaveClass("dotted");
    });
  });

  // Icon Tests
  describe("Icons", () => {
    test("renders with leading icon", () => {
      render(
        <Chips
          type="normal"
          label="Leading Icon Chip"
          LeadingIcon={<MockIcon />}
        />
      );
      const leadingIcon = screen.getByTestId("leading-icon");
      expect(leadingIcon).toBeInTheDocument();
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });

    test("renders with trailing icon", () => {
      render(
        <Chips
          type="normal"
          label="Trailing Icon Chip"
          TrailingIcon={<MockIcon />}
        />
      );
      const trailingIcon = screen.getByTestId("trailing-icon");
      expect(trailingIcon).toBeInTheDocument();
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });

    test("applies correct classes with leading icon", () => {
      render(
        <Chips
          type="normal"
          label="Leading Icon Chip"
          LeadingIcon={<MockIcon />}
        />
      );
      const chip = screen.getByTestId("normal");
      expect(chip).toHaveClass("hasLeadingElements");
    });

    test("applies correct classes with trailing icon", () => {
      render(
        <Chips
          type="normal"
          label="Trailing Icon Chip"
          TrailingIcon={<MockIcon />}
        />
      );
      const chip = screen.getByTestId("normal");
      expect(chip).toHaveClass("hasTrailingElements");
    });
  });

  // Badge Tests
  describe("Badge", () => {
    test("renders with badge", () => {
      render(
        <Chips
          type="normal"
          label="Badge Chip"
          badgeProps={{
            label: "3",
            customClass: "test-badge",
            context: "primary"
          }}
        />
      );
      const badge = screen.getByText("3");
      expect(badge).toBeInTheDocument();
    });

    test("badge takes precedence over trailing icon", () => {
      render(
        <Chips
          type="normal"
          label="Badge Priority"
          badgeProps={{
            label: "3",
            context: "primary"
          }}
          TrailingIcon={<MockIcon />}
        />
      );
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.queryByTestId("trailing-icon")).not.toBeInTheDocument();
    });
  });

  // Interaction Tests
  describe("Interactions", () => {
    test("calls onClick when clicked", () => {
      const onClick = jest.fn();
      render(
        <Chips
          type="normal"
          label="Clickable Chip"
          onClick={onClick}
        />
      );
      fireEvent.click(screen.getByTestId("normal"));
      expect(onClick).toHaveBeenCalledWith("Clickable Chip");
    });

    test("doesn't call onClick when disabled", () => {
      const onClick = jest.fn();
      render(
        <Chips
          type="normal"
          label="Disabled Chip"
          onClick={onClick}
          enabled={false}
        />
      );
      fireEvent.click(screen.getByTestId("normal"));
      expect(onClick).not.toHaveBeenCalled();
    });

    test("triggers onClick on Enter key", () => {
      const onClick = jest.fn();
      render(
        <Chips
          type="normal"
          label="Keyboard Chip"
          onClick={onClick}
        />
      );
      const chip = screen.getByTestId("normal");
      fireEvent.keyUp(chip, { key: "Enter" });
      expect(onClick).toHaveBeenCalledWith("Keyboard Chip");
    });
  });

  // Custom Class Tests
  describe("Custom Classes", () => {
    test("applies custom class", () => {
      render(
        <Chips
          type="normal"
          label="Custom Class Chip"
          customClass="test-custom-class"
        />
      );
      const chip = screen.getByTestId("normal");
      expect(chip).toHaveClass("test-custom-class");
    });
  });

  // Edge Cases
  describe("Edge Cases", () => {
    test("renders with empty label", () => {
      render(<Chips type="normal" label="" />);
      const chip = screen.getByTestId("normal");
      expect(chip).toBeInTheDocument();
    });

    test("renders with long label", () => {
      const longLabel = "This is a very long label that might cause wrapping issues";
      render(<Chips type="normal" label={longLabel} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    test("handles undefined onClick", () => {
      render(<Chips type="normal" label="No Click Handler" />);
      const chip = screen.getByTestId("normal");
      expect(() => fireEvent.click(chip)).not.toThrow();
    });
  });
});