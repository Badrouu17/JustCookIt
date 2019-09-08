import React, { Component } from "react";
import { connect } from "react-redux";

class Details extends Component {
  handleLike = () => {
    this.props.likeChange(this.props.currentRecipe);
  };

  render() {
    return (
      <div className="recipe__details">
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--minutes">
            {this.props.time}
          </span>
          <span className="recipe__info-text"> minutes</span>
        </div>

        <button onClick={this.handleLike} className="recipe__love">
          <svg className="header__likes">
            <use
              className="heart-icon"
              href={`img/icons.svg#icon-${
                this.props.isLiked ? `heart` : `heart-outlined`
              }`}
            ></use>
          </svg>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRecipe: state.currentRecipe,
    isLiked: state.currentRecipe.isLiked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeChange: payload => {
      dispatch({ type: "LIKE_CHANGE", payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
