import { searchAllTags, searchArray } from "./utils/search.js";
import { recipes } from "./Data/recipes.js";
import { getRecipeCardDOM } from "./utils/recipes.js";
import { updateFilterAll } from "./utils/select.js";

//Element UL contenant les tags (ingrédients, appareils etc...)
const tagsListDOM = document.querySelectorAll(".tags-list");

//Input de recherche général
const searchInput = document.getElementById("searchBar");

//Résultat de la recherche actuelle (pa défaut toute les recettes)
let searchResults = recipes;

//Listes des tags sélectionnés
const selectedTagsList = {
  "ingredients-list": [],
  "appliances-list": [],
  "ustensils-list": [],
};

/**
 * Lance une recherche basé via la valeur de l'input
 * @returns Le tableau de résultats si l'input contient une valeur sinon renvoie toutes les recettes
 */
function searchByInput(){
  const value = searchInput.value;

  let result = [];

  if(value.length > 2){
    result = searchArray(recipes,valeur);
  }else{
    result = recipes;
  }

  return result;
}

searchInput.oninput = () => {
  searchResults = searchByInput();

  updateIndexDOM();
};

/**
 * Mets à jour l'affiche de la page index
 */
function updateIndexDOM() {
  console.log("Update Index");
  console.log(searchResults);

  updateFilterAll(tagsListDOM, selectedTagsList, searchResults);

  const gridDOM = document.getElementById("searchResult");

  while (gridDOM.firstChild) {
    gridDOM.removeChild(gridDOM.firstChild);
  }

  console.log("After");
  console.log(searchResults);

  searchResults.forEach((recipe) => {
    const recipeDOM = getRecipeCardDOM(recipe);

    gridDOM.appendChild(recipeDOM);
  });

  tagsListDOM.forEach((list) => {
    list.childNodes.forEach((node) => {
      node.onclick = clickTag;
    });
  });
}

/**
 * Ajoute le tag souhaité dans la liste.
 * Note : a placé sur un onclick
 * @param {Event} e L'event de l'élément
 */
function clickTag(e) {
  const element = e.target;

  const idList = element.parentNode.id;

  if (!selectedTagsList[idList].includes(e.target.innerText)) {
    selectedTagsList[idList].push(e.target.innerText);
  } else {
    selectedTagsList[idList].splice(idList.indexOf(e.target.innerText), 1);
  }

  searchResults = searchByInput();
  searchResults = searchAllTags(searchResults, selectedTagsList);

  updateIndexDOM();
}

function init() {
  updateIndexDOM();
}

init();
