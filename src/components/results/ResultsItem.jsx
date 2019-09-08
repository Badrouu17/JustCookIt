import React, { Component } from "react";

class ResultsItem extends Component {
  render() {
    const { id, title, author, img, active } = this.props;
    return (
      <li>
        <a
          id={id}
          onClick={this.props.onClick}
          className={`results__link results__link${active ? `--active` : ``}`}
          href={id}
        >
          <figure className="results__fig">
            <img src={img} alt="...Wait .." />
          </figure>
          <div className="results__data">
            <h4 className="results__name">{title}</h4>
            <p className="results__author">{author}</p>
          </div>
        </a>
      </li>
    );
  }
}

export default ResultsItem;
