import { takeLatest, all, put } from "redux-saga/effects";
import axios from "axios";

let key;
let h = new Date();

switch (h.getHours()) {
  case 0 || 1:
    key = "fa16f69849dedf0db3a08bbf98b45705";
    break;
  case 2 || 3:
    key = "c05285e24d8d82d9607087798f28cdf1";
    break;
  case 4 || 5:
    key = "93e0304726f6f571243cfde25265d62a";
    break;
  case 6 || 7:
    key = "b7ce0fb5f99a864e7032976a2d08822e";
    break;
  case 8 || 9:
    key = "630adb520f31dd1b5a4adab118b7caca";
    break;
  case 10 || 11:
    key = "83661c3feabf31e2bab7c84da5517861";
    break;
  case 12 || 13:
    key = "d87e53fc8eef39da82ecebb6709d45e4";
    break;
  case 14 || 15:
    key = "43f736daf1f05423367b02e1156ca038";
    break;
  case 16 || 17:
    key = "f9347a002bdcbeadbf07ada8cad7ae53";
    break;
  case 18 || 19:
    key = "00334a5b2a091d83285c3ba338923ff7";
    break;
  case 20 || 21:
    key = "23ef0ffb1f87e7eb7cf577fd42bcbb23";
    break;
  case 22 || 23:
    key = "9a4e783c8bdbefdbc739412d4fe284d6";
    break;

  default:
    key = "9a4e783c8bdbefdbc739412d4fe284d6";
    break;
}

const searchApi = `https://www.food2fork.com/api/search?key=${key}`;

const recipeApi = `https://www.food2fork.com/api/get?key=${key}`;

function* getRecipes({ payload }) {
  try {
    yield put({ type: "LOADING", payload: "listRecipe" });
    const { data } = yield axios.get(`${searchApi}&q=${payload}`);

    yield put({ type: "RECIPES_RECEIVED", payload: data.recipes });
  } catch (error) {
    yield put({ type: "ERROR", payload: error });
  }
}

function* getCurrentRecipe({ payload }) {
  try {
    yield put({ type: "LOADING", payload: "recipe" });
    const { data } = yield axios.get(`${recipeApi}&rId=${payload}`);
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
