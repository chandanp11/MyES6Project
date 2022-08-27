import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

// import icons from '../img/icons.svg'; // parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';
import { async } from 'regenerator-runtime';

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    resultsView.render(model.getSearchResultPage());

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    await model.loadSearchResults(query);
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

// controlSearchResult();

const controlPagination = function (gotoPage) {
  console.log('Page contoller', gotoPage);
  resultsView.render(model.getSearchResultPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
  // recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};

init();
