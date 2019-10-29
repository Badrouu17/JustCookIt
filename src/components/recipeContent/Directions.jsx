import React from "react";

const Directions = ({ publisher, source }) => {
  return (
    <div className="recipe__directions">
      <h2 className="heading-2">How to cook it</h2>
      <p className="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span className="recipe__by"> {publisher} </span>. Please check out
        directions at their website.
      </p>
      <a target="_blank" className="btn-small recipe__btn" href={source}>
        <span>Directions</span>
        <svg className="search__icon">
          <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
      </a>
    </div>
  );
};

export default Directions;
