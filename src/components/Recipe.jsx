import React, { Component } from "react";
import { connect } from "react-redux";

import Fig from "./recipeContent/Fig";
import Details from "./recipeContent/Details";
// import Ingredients from "./recipeContent/Ingredients";
import Directions from "./recipeContent/Directions";
import Louder from "./louder";

class Recipe extends Component {
  render() {
    if (this.props.currentRecipe) {
      var {
        image_url: img,
        title,
        publisher,
        source_url: source,
        ingredients,
      } = this.props.currentRecipe;

      var time = ingredients ? ingredients.length * 5 : 20;
    }

    return (
      <div className="recipe">
        {this.props.loading && <Louder></Louder>}
        {this.props.currentRecipe && (
          <React.Fragment>
            <Fig title={title} img={img}></Fig>
            <Details time={time}></Details>
            {/* <Ingredients content={ingredients}></Ingredients> */}
            <Directions publisher={publisher} source={source}></Directions>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentRecipe: state.currentRecipe,
    loading: state.recipeLoading,
  };
};

export default connect(mapStateToProps)(Recipe);
