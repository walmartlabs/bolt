import React from "react";
import {BoilerplateComponent} from "../src/index";

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        < BoilerplateComponent />
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
