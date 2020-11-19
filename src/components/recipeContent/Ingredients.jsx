import React from "react";
import { Fraction } from "fractional";

const Ingredients = ({ content }) => {
  const formatCount = (count) => {
    if (count) {
      const newCount = Math.round(count * 10000) / 10000;
      const [int, dec] = newCount
        .toString()
        .split(".")
        .map((el) => parseInt(el, 10));

      if (!dec) return newCount;

      if (int === 0) {
        const fr = new Fraction(newCount);
        return `${fr.numerator}/${fr.denominator}`;
      } else {
        const fr = new Fraction(newCount - int);
        return `${int} ${fr.numerator}/${fr.denominator}`;
      }
    }
    return "?";
  };

  const parseIngredients = () => {
    if (!content) return [];
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];
    const units = [...unitsShort, "kg", "g"];

    const newContent = content.map((el) => {
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex((el2) => units.includes(el2));
      let objIng;
      if (unitIndex > -1) {
        let arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          if (arrIng[0].endsWith("+")) {
            count = eval(arrIng[0].replace("+", ""));
          } else {
            count = eval(arrIng[0].replace("-", "+"));
          }
        } else {
          if (arrCount[0].length > 3) {
            arrCount.shift();
          }
          if (arrCount.length > 2) {
            arrCount = [arrCount[0]];
          }

          count = eval(arrCount.join("+"));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" "),
        };
      } else if (parseInt(arrIng[0], 10)) {
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: "",
          ingredient,
        };
      }

      return objIng;
    });
    return newContent;
  };

  const newContent = parseIngredients();

  return (
    <div className="recipe__ingredients">
      <ul className="recipe__ingredient-list">
        {newContent.map((ing, i) => {
          return (
            <li key={i} className="recipe__item">
              <svg className="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
              </svg>
              <div className="recipe__count">{formatCount(ing.count)}</div>
              <div className="recipe__ingredient">
                <span className="recipe__unit">{ing.unit}</span>
                {ing.ingredient}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ingredients;
