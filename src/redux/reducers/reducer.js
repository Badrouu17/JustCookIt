const initialState = {
  recipes: null,
  currentPage: null,
  currentRecipe: null,
  likedRecipes: [],
  likeVisibility: "hidden",
  recipesListLoading: false,
  recipeLoading: false,
  error: null
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "PAGE_LOAD":
      return {
        ...state,
        likedRecipes: payload,
        likeVisibility: payload.length === 0 ? "hidden" : "visible"
      };
    case "GET_RECIPES":
      return { ...state, currentRecipe: null };
    case "RECIPES_RECEIVED":
      return {
        ...state,
        recipes: payload,
        currentPage: 1,
        recipesListLoading: false
      };
    case "PAGE_CHANGE":
      let change = payload === "next" ? 1 : -1;
      return { ...state, currentPage: state.currentPage + change };
    case "SHOW_RECIPE":
      return { ...state, currentRecipe: null };
    case "RECIPE_RECEIVED":
      let isIn = localStorage.getItem(payload.recipe_id);
      let isInParsed = {};
      if (isIn) {
        isInParsed = JSON.parse(isIn);
      }

      return {
        ...state,
        currentRecipe: {
          ...payload,
          isLiked: isInParsed.recipe_id === payload.recipe_id ? true : false
        },
        recipeLoading: false
      };
    case "LIKE_CHANGE":
      return {
        ...state,
        currentRecipe: {
          ...state.currentRecipe,
          isLiked: !state.currentRecipe.isLiked
        }
      };
    case "LIKED_RECIPES_CHANGE":
      return {
        ...state,
        likedRecipes: payload,
        likeVisibility: payload.length === 0 ? "hidden" : "visible"
      };
    case "LOADING":
      if (payload === "recipe") {
        return {
          ...state,
          recipeLoading: true
        };
      } else {
        return {
          ...state,
          recipesListLoading: true
        };
      }
    case "ERROR":
      console.log(payload);
      return { ...state, error: payload };
    default:
      return state;
  }
}

export default reducer;
