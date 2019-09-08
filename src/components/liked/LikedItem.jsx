import React from "react";

const LikedItem = ({ title, publisher, img, id, showRecipe }) => {
  return (
    <li>
      <a
        onClick={e => {
          e.preventDefault();
          showRecipe(id);
        }}
        className="likes__link"
        href={id}
      >
        <figure className="likes__fig">
          <img src={img} alt="Test" />
        </figure>
        <div className="likes__data">
          <h4 className="likes__name">{title}</h4>
          <p className="likes__author">{publisher}</p>
        </div>
      </a>
    </li>
  );
};

export default LikedItem;
