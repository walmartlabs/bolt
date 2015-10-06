/**
 * Client tests
 */
import React from "react/addons";

describe("<%= _.capitalize(name) %>", () => {
  let <%= _.capitalize(name) %>;
  let component;
  let container;

  beforeEach(() => {
    <%= _.capitalize(name) %> = require("src/components/<%= _.kebabCase(name) %>");
    container = document.createElement("div");
  });

  afterEach(() => {
    React.unmountComponentAtNode(container);
  });

  it("has expected content with deep render", () => {
    component = React.render(
      <<%= _.capitalize(name) %> />,
      container
    );

    expect(component).to.not.be.false;
  });
});
