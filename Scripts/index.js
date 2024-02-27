import {
  searchArray,
  searchByAppliance,
  searchByIngredient,
  searchByUstensils,
} from "./utils/search.js";
import { recipes } from "./Data/recipes.js";
import { getRecipeCardDOM } from "./utils/recipes.js";
import { updateFilterAll } from "./utils/select.js";

const searchInput = document.getElementById("searchBar");

const divGrid = document.querySelector(".Recettes-grid");

const selectIngredient = document.getElementById("ingredientfilter");

const selectAppliance = document.getElementById("appliancefilter");

const selectUstensils = document.getElementById("ustensilsfilter");

//Variable contenant le résultat de la recherche (ou pointe vers toutes les recettes par défaut)
let searchResult = [];

/**
 * Mets à jour le DOM pour afficher le résultat de la recherche
 */
function updateResultDOM() {
  while (divGrid.firstChild) {
    divGrid.removeChild(divGrid.firstChild);
  }

  updateFilterAll(searchResult);

  searchResult.forEach((recipe) => {
    divGrid.appendChild(getRecipeCardDOM(recipe));
  });
}

/**
 * Effectue la recherche (via le paramétre searchFunction) via le filtre
 * @param {HTMLSelectElement} filterDOM Le DOM du select
 * @param {Function} searchFunction Fonction de recherche
 */
function searchFilter(filterDOM, searchFunction) {
  const selected = filterDOM.value;

  if (selected !== "none") {
    searchResult = searchFunction(searchResult, selected);
    updateResultDOM();

    for (let i = 0; i < filterDOM.childNodes.length; i++) {
      if (filterDOM.childNodes[i].value === selected) {
        filterDOM.childNodes[i].selected = true;
        break;
      }
    }
  }else{
    const valIngredient = selectIngredient.value;

    const valApp = selectAppliance.value;

    const valUstensil = selectUstensils.value;

    if(valIngredient === "none" && valUstensil === "none" && valApp === "none"){
      searchResult = searchArray(recipes, searchInput.value);

      updateResultDOM();
    }
  }
}

//Gestion de l'input
searchInput.oninput = () => {
  //Suppression de la liste des recettes actuellement affichés
  while (divGrid.firstChild) {
    divGrid.removeChild(divGrid.firstChild);
  }

  if (searchInput.value.length > 2) {
    searchResult = searchArray(recipes, searchInput.value);
  } else if (searchInput.value.length == 0) {
    searchResult = recipes;
  }

  updateResultDOM();
};

//Gestion des select (via searchFilter)
selectIngredient.onchange = () => {
  searchFilter(selectIngredient, searchByIngredient);
};

selectAppliance.onchange = () => {
  searchFilter(selectAppliance, searchByAppliance);
};

selectUstensils.onchange = () => {
  searchFilter(selectUstensils, searchByUstensils);
};

function init() {
  searchResult = recipes;

  updateResultDOM();
}

init();
