import React, { Component } from "react";
import ResultsItem from "./results/ResultsItem";
import { connect } from "react-redux";
import { paginate } from "./../utils/paginate";
import Louder from "./louder";

class Results extends Component {
  state = {
    activeItemId: ""
  };

  handlePageChange = e => {
    e.preventDefault();
    e.currentTarget.value === "next"
      ? this.props.pageChange("next")
      : this.props.pageChange("prev");
  };

  handleClickedRecipe = e => {
    e.preventDefault();
    this.setState({ activeItemId: e.currentTarget.id });
    this.props.showRecipe(e.currentTarget.id);
  };

  render() {
    const recipesPaginated = paginate(
      this.props.recipes,
      this.props.currentPage
    );
    return (
      <div className="results">
        {this.props.loading && <Louder></Louder>}
        <ul className="results__list">
          {this.props.recipes &&
            recipesPaginated.map(
              ({ title, publisher, image_url, recipe_id }) => (
                <ResultsItem
                  key={recipe_id}
                  id={recipe_id}
                  img={image_url}
                  title={title}
                  author={publisher}
                  onClick={this.handleClickedRecipe}
                  active={this.state.activeItemId === recipe_id ? true : false}
                ></ResultsItem>
              )
            )}
        </ul>

        {this.props.recipes && (
          <div className="results__pages">
            {this.props.currentPage >= 2 && (
              <button
                onClick={this.handlePageChange}
                className="btn-inline results__btn--prev"
                value="prev"
              >
                <svg className="search__icon">
                  <use href="img/icons.svg#icon-triangle-left"></use>
                </svg>
                <span>Prev</span>
              </button>
            )}

            {this.props.currentPage <= 2 && (
              <button
                onClick={this.handlePageChange}
                className="btn-inline results__btn--next"
                value="next"
              >
                <span>Next</span>
                <svg className="search__icon">
                  <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    currentPage: state.currentPage,
    loading: state.recipesListLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pageChange: payload => {
      dispatch({ type: "PAGE_CHANGE", payload });
    },
    showRecipe: id => {
      dispatch({ type: "SHOW_RECIPE", payload: id });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
