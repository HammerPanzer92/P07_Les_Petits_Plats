import { searchAllTags } from "./utils/search.js";
import { recipes } from "./Data/recipes.js";
import { getRecipeCardDOM } from "./utils/recipes.js";
import { updateFilterAll } from "./utils/select.js";

//Element UL contenant les tags (ingrédients, appareils etc...)
const tagsListDOM = document.querySelectorAll(".tags-list");

//Résultat de la recherche actuelle (pa défaut toute les recettes)
let searchResults = recipes;

//Listes des tags sélectionnés
const selectedTagsList = {
  "ingredients-list": [],
  "appliances-list": [],
  "ustensils-list": [],
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
 * Ajout le tag souhaité dans la liste.
 * Note : a placé sur un onclick
 * @param {Event} e L'event de l'élément
 */
function clickTag(e) {
  const element = e.target;

  const idList = element.parentNode.id;

  if (!selectedTagsList[idList].includes(e.target.innerText)) {
    selectedTagsList[idList].push(e.target.innerText);
    //A faire : modifié classList
  } else {
    selectedTagsList[idList].splice(idList.indexOf(e.target.innerText), 1);
  }

  searchResults = searchAllTags(searchResults, selectedTagsList);

  console.log("Result :");
  console.log(searchResults);

  updateIndexDOM();
}

function init() {
  console.log("Init :");
  console.log(searchResults);
  updateIndexDOM();
}

init();
