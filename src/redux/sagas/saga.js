import { takeLatest, all, put } from "redux-saga/effects";
import axios from "axios";

const searchApi = `https://cors-anywhere.herokuapp.com/http://recipesapi.herokuapp.com/api/search?q=`;

const recipeApi = `https://cors-anywhere.herokuapp.com/http://recipesapi.herokuapp.com/api/get?rId=`;

function* getRecipes({ payload }) {
  try {
    yield put({ type: "LOADING", payload: "listRecipe" });
    const { data } = yield axios.get(`${searchApi}${payload}`);

    yield put({ type: "RECIPES_RECEIVED", payload: data.recipes });
  } catch (error) {
    yield put({ type: "ERROR", payload: error });
  }
}

function* getCurrentRecipe({ payload }) {
  try {
    yield put({ type: "LOADING", payload: "recipe" });
    const { data } = yield axios.get(`${recipeApi}${payload}`);
    const newRecipe = { ...data.recipe, isLiked: false };

    yield put({ type: "RECIPE_RECEIVED", payload: newRecipe });
  } catch (error) {
    yield put({ type: "ERROR", payload: error });
  }
}

function* changeLocalStorage({ payload }) {
  if (!payload.isLiked) {
    localStorage.setItem(payload.recipe_id, JSON.stringify(payload));
  } else {
    localStorage.removeItem(payload.recipe_id);
  }

  let newLikedRecipes = [];
  let storage = { ...window.localStorage };
  if (window.localStorage.length > 0) {
    for (var key in storage) {
      newLikedRecipes.push(JSON.parse(storage[key]));
    }
  }

  yield put({ type: "LIKED_RECIPES_CHANGE", payload: newLikedRecipes });
}

function* actionWatcher() {
  yield takeLatest("GET_RECIPES", getRecipes);
  yield takeLatest("SHOW_RECIPE", getCurrentRecipe);
  yield takeLatest("LIKE_CHANGE", changeLocalStorage);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
