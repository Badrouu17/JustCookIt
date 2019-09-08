import React, { Component } from "react";
import { connect } from "react-redux";
import LikedItem from "./liked/LikedItem";

class Header extends Component {
  state = {
    input: ""
  };

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSearch(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <header className="header">
        <img src="img/favicon.png" alt="Logo" className="header__logo" />

        <form className="search" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="search__field"
            placeholder="Search over 1,000,000 recipes..."
            onChange={this.handleInputChange}
            value={this.state.input}
          />
          <button className="btn search__btn">
            <svg className="search__icon">
              <use href="img/icons.svg#icon-magnifying-glass"></use>
            </svg>
            <span>Search</span>
          </button>
        </form>

        <div id="likes" style={{ visibility: this.props.likeVisibility }}>
          <div className="likes__field">
            <svg className="likes__icon">
              <use href="img/icons.svg#icon-heart"></use>
            </svg>
          </div>
          <div className="likes__panel">
            <ul className="likes__list">
              {this.props.likedRecipes.length > 0 &&
                this.props.likedRecipes.map(
                  ({ image_url: img, title, publisher, recipe_id: id }) => (
                    <LikedItem
                      showRecipe={this.props.showRecipe}
                      key={id}
                      id={id}
                      title={title}
                      publisher={publisher}
                      img={img}
                    ></LikedItem>
                  )
                )}
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    likedRecipes: state.likedRecipes,
    likeVisibility: state.likeVisibility
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearch: input => {
      dispatch({
        type: "GET_RECIPES",
        payload: input
      });
    },
    showRecipe: id => {
      dispatch({ type: "SHOW_RECIPE", payload: id });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
