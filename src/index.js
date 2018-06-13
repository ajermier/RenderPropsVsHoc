import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// render-props component to wrap components we want to expose view configs to
class ConfigurableComponent extends React.Component {
  render() {
    const { render } = this.props;
    const viewConfigs = ["prop1", "prop2"]; // result from state selector via connect or something that has stored preloaded viewConfig strings.
    const viewConfigProps = Object.assign(
      ...viewConfigs.map(k => ({ [k]: true })) // convert array of strings of view config constants to an object that we can spread as props to any component
    );
    return render({ ...viewConfigProps });
  }
}

// higher order component
const withViewConfig = ConfigurableComponent =>
  class extends React.Component {
    render() {
      const viewConfigs = ["prop1", "prop2"]; // result from state selector via connect or something that has stored preloaded viewConfig strings.
      const viewConfigProps = Object.assign(
        ...viewConfigs.map(k => ({ [k]: true })) // convert array of strings of view config constants to an object that we can spread as props to any component
      );
      return <ConfigurableComponent {...viewConfigProps} />;
    }
  };

class SimpleDisplay extends React.Component {
  render() {
    console.log(this.props);
    const { prop1, prop2, prop3, prop4 } = this.props;
    return (
      <div>
        {prop1 && <h2>prop1</h2>}
        {prop2 && <h2>prop2</h2>}
        {!prop3 && <h2>not prop3</h2>}
        {prop4 && <h2>prop4</h2>}
      </div>
    );
  }
}

const WrappedSimpleComponent = withViewConfig(SimpleDisplay);

function App() {
  return (
    <div className="App">
      <h1>RenderProps</h1>
      <ConfigurableComponent
        render={viewConfigProps => <SimpleDisplay {...viewConfigProps} />}
      />
      <h1>Higher Order Component:</h1>
      <WrappedSimpleComponent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
