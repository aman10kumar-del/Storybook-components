import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Alerts from './Alerts';

// Mock SVG component for testing
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

describe("Test Alerts", () => {
  test("is alert present", () => {
    render((
      <Alerts layout='block' context='primary' subTitle='SubTitle' active/>
    ));
    const container = screen.getByTestId('alerts-container');
    expect(container).toBeInTheDocument();
  });

  test("title present", () => {
    render((
      <Alerts layout='block' context='primary' title='Title' subTitle='SubTitle' active/>
    ));
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
  });

  test("leading icon present", () => {
    render((
      <Alerts layout='block' context='primary' LeadingIcon={<MockIcon />} subTitle='SubTitle' active/>
    ));
    const icon = screen.getByTestId('leading-icon');
    expect(icon).toBeInTheDocument();
  });

  test("action present", () => {
    render((
      <Alerts
        layout='block' 
        context='primary' 
        subTitle='SubTitle' 
        active
        action={{
          label: "Label",
          onClick: () => {}
        }}
      />
    ));
    const actionCta = screen.getByTestId('button');
    expect(actionCta).toBeInTheDocument();
  });

  test("primary", () => {
    render((
      <Alerts layout='block' context='primary' subTitle='SubTitle' active/>
    ));
    const negativeType = screen.getByTestId('alerts-container');
    expect(negativeType).toHaveClass("primary");
  });

  test("negative", () => {
    render((
      <Alerts layout='block' context='negative' subTitle='SubTitle' active/>
    ));
    const negativeType = screen.getByTestId('alerts-container');
    expect(negativeType).toHaveClass("negative");
  });

  test("notice", () => {
    render((
      <Alerts layout='block' context='notice' subTitle='SubTitle' active/>
    ));
    const noticeType = screen.getByTestId('alerts-container');
    expect(noticeType).toHaveClass("notice");
  });

  test("positive", () => {
    render((
      <Alerts layout='block' context='positive' subTitle='SubTitle' active/>
    ));
    const positiveType = screen.getByTestId('alerts-container');
    expect(positiveType).toHaveClass("positive")
  });

  test("inline", () => {
    render((
      <Alerts layout='inline' context='primary' subTitle='SubTitle' active/>
    ));
    const container = screen.getByTestId('alerts-container');
    expect(container).toHaveClass("inline")
  });

  test("block", () => {
    render((
      <Alerts layout='block' context='primary' subTitle='SubTitle' active />
    ));
    const container = screen.getByTestId('alerts-container');
    expect(container).toHaveClass("block")
  });

  test("block by default", () => {
    render((
      //@ts-ignore
      <Alerts type='primary' subTitle='SubTitle' active />
    ));
    const container = screen.getByTestId('alerts-container');
    expect(container).toHaveClass("block")
  });

  test("trigger close dismisses alert", () => {
    let active = true;
    const triggerClose = jest.fn();
    let getComponent = () => (
      <Alerts
        layout='inline'
        active={active}
        showDismissIcon={true}
        triggerClose={triggerClose}
        context='primary'
        title='Title'
        subTitle='SubTitle' />
    )
    const { rerender } = render(getComponent());
    const container = screen.getByTestId('alerts-container')
    expect(container).toBeInTheDocument();
    const closeIcon = screen.getByTestId('close-icon');
    fireEvent.click(closeIcon);
    expect(triggerClose).toHaveBeenCalledWith();
    active = false;
    rerender(getComponent())
    expect(container).not.toBeInTheDocument();
  })

  test("subtitle is rendered correctly", () => {
    const subtitleText = "Test Subtitle";
    render((
      <Alerts layout='block' context='primary' subTitle={subtitleText} active/>
    ));
    const subtitle = screen.getByTestId('sub-title');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.textContent).toBe(subtitleText);
  });

  test("custom class is applied", () => {
    const customClass = "test-custom-class";
    render((
      <Alerts 
        layout='block' 
        context='primary' 
        subTitle='SubTitle' 
        active 
        customClass={customClass}
      />
    ));
    const container = screen.getByTestId('alerts-container');
    expect(container).toHaveClass(customClass);
  });

  test("large leading icon is rendered correctly", () => {
    render((
      <Alerts 
        layout='block' 
        context='primary' 
        LeadingIcon={<MockIcon />} 
        LargeLeadingIcon={true}
        subTitle='SubTitle' 
        active
      />
    ));
    const iconWrapper = screen.getByTestId('leading-icon');
    expect(iconWrapper).toHaveClass('large');
  });

  test("action button click handler is called", () => {
    const handleClick = jest.fn();
    render((
      <Alerts
        layout='block' 
        context='primary' 
        subTitle='SubTitle' 
        active
        action={{
          label: "Action",
          onClick: handleClick
        }}
      />
    ));
    const actionButton = screen.getByTestId('button');
    fireEvent.click(actionButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders all elements together correctly", () => {
    const handleClick = jest.fn();
    const handleClose = jest.fn();
    render((
      <Alerts
        layout='block' 
        context='primary' 
        title="Test Title"
        subTitle='Test Subtitle' 
        LeadingIcon={<MockIcon />}
        LargeLeadingIcon={true}
        active
        showDismissIcon={true}
        triggerClose={handleClose}
        action={{
          label: "Action",
          onClick: handleClick
        }}
      />
    ));
    
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('sub-title')).toBeInTheDocument();
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  test("default props are applied correctly", () => {
    render((
      <Alerts 
        context="primary"
        layout="block"
        subTitle='SubTitle' 
        active 
      />
    ));
    const container = screen.getByTestId('alerts-container');
    expect(container).toHaveClass('block'); // default layout
    expect(container).toHaveClass('primary'); // default context
  });

  test("handles empty action object", () => {
    render((
      <Alerts
        layout='block' 
        context='primary' 
        subTitle='SubTitle' 
        active
        action={{} as any}
      />
    ));
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
  });

  test("inactive alert renders nothing", () => {
    const { container } = render((
      <Alerts
        layout='block' 
        context='primary' 
        subTitle='SubTitle' 
        active={false}
      />
    ));
    expect(container).toBeEmptyDOMElement();
  });
});