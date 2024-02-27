import {
  getListIngredients,
  getListAppliance,
  getListUstensils,
} from "./recipes.js";

/**
 * Mets à jour d'un select pour afficher les options souhaités
 * @param {Array} optionsList Tableau des options a affiché
 * @param {HTMLSelectElement} selectDOM L'élément Select a modifié
 */
export function updateFilterSelect(optionsList, selectDOM) {

  while (selectDOM.childNodes[3]) {
    selectDOM.removeChild(selectDOM.childNodes[3]);
  }

  optionsList.forEach((option) => {
    const elementDOM = document.createElement("option");
    elementDOM.value = option;
    elementDOM.innerText = option;

    selectDOM.appendChild(elementDOM);
  });
}

/**
 * Mets à jour tout les select a partir d'un tableau de recettes
 * @param {Array} recipesList Liste des recettes
 */
export function updateFilterAll(recipesList) {
  const selectIngredient = document.getElementById("ingredientfilter");

  updateFilterSelect(getListIngredients(recipesList), selectIngredient);

  const appliancefilter = document.getElementById("appliancefilter");

  updateFilterSelect(getListAppliance(recipesList), appliancefilter);

  const ustensilfilter = document.getElementById("ustensilsfilter");

  updateFilterSelect(getListUstensils(recipesList), ustensilfilter);
}
