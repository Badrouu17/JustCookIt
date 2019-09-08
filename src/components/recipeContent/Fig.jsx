import React from "react";

const Fig = ({ title, img }) => {
  return (
    <div className="recipe__fig">
      <img src={img} alt="Tomato" className="recipe__img" />
      <h1 className="recipe__title">
        <span>{title}</span>
      </h1>
    </div>
  );
};

export default Fig;
