import { searchArray } from "./utils/search.js";
import { recipes } from "./Data/recipes.js";
import {
  getRecipeCardDOM,
  getListAppliance,
  getListIngredients,
  getListUstensils
} from "./utils/recipes.js";

const searchInput = document.getElementById("searchBar");

const divGrid = document.querySelector(".Recettes-grid");

let searchResult = [];

searchInput.oninput = () => {
  if (searchInput.value.length > 2) {
    while (divGrid.firstChild) {
      divGrid.removeChild(divGrid.firstChild);
    }

    searchResult = searchArray(recipes, searchInput.value);

    searchResult.forEach((result) => {
      divGrid.appendChild(getRecipeCardDOM(result));
    });

    updateFilterSelect(searchResult);
  } else if (searchInput.value.length == 0) {
    while (divGrid.firstChild) {
      divGrid.removeChild(divGrid.firstChild);
    }

    recipes.forEach((recipe) => {
      divGrid.appendChild(getRecipeCardDOM(recipe));
    });
  }
};

/**
 * Mets à jour les select pour afficher que les élèments utilisés dans les recettes
 * indiqués
 * @param {Array} recipesList Tableau des recettes
 */
function updateFilterSelect(recipesList){
  let ingredientsList = getListIngredients(recipesList);

  let ustensilsList = getListUstensils(recipesList);

  let applianceList = getListAppliance(recipesList);

  //Mise à jour du select pour les ingrédients
  const filterIngredient = document.getElementById("ingredientfilter")

  ingredientsList.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.innerText = element;

    filterIngredient.appendChild(option);
  });

  //Mise à jour du select pour les appareils
  const filterAppliance = document.getElementById("appliancefilter")

  applianceList.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.innerText = element;

    filterAppliance.appendChild(option);
  });

  //Mise à jour du select des ustensils
  const filterUstensils = document.getElementById("ustensilsfilter");

  ustensilsList.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.innerText = element;

    filterUstensils.appendChild(option);
  });
}