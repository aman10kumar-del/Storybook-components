import React from "react";
import { render, screen } from "@testing-library/react";
import ActivityTimeline from "./ActivityTimeline";

describe("Test ActivityTimeline", () => {
  // Basic Tests
  test("is present", () => {
    render(
      <ActivityTimeline
        type="horizontal"
        options={[]}
      />
    );
    const container = screen.getByTestId("activity-timeline-container");
    expect(container).toBeInTheDocument();
  });

  // Direction Tests
  test("horizontal direction", () => {
    render((
      <ActivityTimeline
        type="horizontal"
        options={[]}
      />
    ));
    const container = screen.getByTestId("activity-timeline-container");
    expect(container).toHaveClass('horizontal');
  });

  test("vertical direction", () => {
    render((
      <ActivityTimeline
        type="vertical"
        options={[]}
      />
    ));
    const container = screen.getByTestId("activity-timeline-container");
    expect(container).toHaveClass('vertical');
  });

  // Items Rendering Test
  test("items present", () => {
    render((
      <ActivityTimeline
        type="horizontal"
        options={[
          {
            id: '1',
            step: 'awaited'
          },
          {
            id: '2',
            step: 'processing'
          },
          {
            id: '3',
            step: 'completed'
          },
          {
            id: '4',
            step: 'failed'
          }
        ]}
      />
    ));
    const items = screen.getAllByTestId("timeline-item");
    expect(items).toHaveLength(4);
  });

  // Horizontal Timeline Specific Tests
  describe("Horizontal Timeline", () => {
    test("renders with title", () => {
      render((
        <ActivityTimeline
          type="horizontal"
          options={[
            {
              id: '1',
              step: 'completed',
              title: 'Step 1'
            }
          ]}
        />
      ));
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    test("renders different step types", () => {
      render((
        <ActivityTimeline
          type="horizontal"
          options={[
            { id: '1', step: 'completed-brand' },
            { id: '2', step: 'warning' },
            { id: '3', step: 'loading' },
            { id: '4', step: 1 }
          ]}
        />
      ));
      expect(screen.getByTestId('success')).toBeInTheDocument();
      expect(screen.getByTestId('warning')).toBeInTheDocument();
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByTestId('number')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test("handles active/inactive states", () => {
      render((
        <ActivityTimeline
          type="horizontal"
          options={[
            { id: '1', step: 'completed', active: true },
            { id: '2', step: 'completed', active: false }
          ]}
        />
      ));
      const icons = screen.getAllByTestId('success');
      expect(icons[1]).toHaveClass('inactive');
      expect(icons[0]).not.toHaveClass('inactive');
    });
  });

  // Vertical Timeline Specific Tests
  describe("Vertical Timeline", () => {
    test("renders with top alignment by default", () => {
      render((
        <ActivityTimeline
          type="vertical"
          options={[
            {
              id: '1',
              step: 'completed',
              title: 'Step 1',
              subtitle: 'Description',
              actionProps: { label: 'Action', onClick: () => {} }
            }
          ]}
        />
      ));
      const container = screen.getByTestId("activity-timeline-container");
      expect(container).not.toHaveClass('center');
    });

    test("renders with center alignment", () => {
      render((
        <ActivityTimeline
          type="vertical"
          alignment="center"
          options={[
            {
              id: '1',
              step: 'completed',
              title: 'Step 1',
              actionProps: { label: 'Action', onClick: () => {} }
            }
          ]}
        />
      ));
      expect(screen.getByTestId("timeline-item").querySelector('.separatorWrapper.top')).toBeInTheDocument();
    });

    test("renders with title, subtitle and action button", () => {
      render((
        <ActivityTimeline
          type="vertical"
          options={[
            {
              id: '1',
              step: 'completed',
              title: 'Step Title',
              subtitle: 'Step Description',
              actionProps: { label: 'Action Button', onClick: () => {} }
            }
          ]}
        />
      ));
      expect(screen.getByText('Step Title')).toBeInTheDocument();
      expect(screen.getByText('Step Description')).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });

    test("renders different step types with active/inactive states", () => {
      render((
        <ActivityTimeline
          type="vertical"
          options={[
            { 
              id: '1', 
              step: 'processing', 
              active: true,
              actionProps: { label: 'Action', onClick: () => {} }
            },
            { 
              id: '2', 
              step: 'failed', 
              active: false,
              actionProps: { label: 'Action', onClick: () => {} }
            }
          ]}
        />
      ));
      expect(screen.getByTestId('processing')).not.toHaveClass('inactive');
      expect(screen.getByTestId('failed')).toHaveClass('inactive');
    });
  });
});