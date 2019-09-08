import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./components/Header";
import Results from "./components/Results";
import Recipe from "./components/Recipe";
import Shopping from "./components/Shopping";

class App extends Component {
  state = {};

  componentDidMount() {
    let likedRecipes = [];
    let storage = { ...window.localStorage };
    if (window.localStorage.length > 0) {
      for (var key in storage) {
        likedRecipes.push(JSON.parse(storage[key]));
      }

      this.props.getFromTheLocalStorage(likedRecipes);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="app container">
          <Header />
          <Results />
          <Recipe />
          <Shopping />
        </div>

        <div className="advice">
          <img className="advice-logo" src="img/favicon.png" alt="Logo" />
          <p className="advice-content">
            please use the app in a bigger device.
          </p>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFromTheLocalStorage: payload => {
      dispatch({ type: "PAGE_LOAD", payload });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
