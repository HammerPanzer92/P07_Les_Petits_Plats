import { searchAllTags, searchArray } from "./utils/search.js";
import { recipes } from "./Data/recipes.js";
import { getRecipeCardDOM } from "./utils/recipes.js";
import { updateFilterAll } from "./utils/select.js";

//Element UL contenant les tags (ingrédients, appareils etc...)
const tagsListDOM = document.querySelectorAll(".tags-list");

//Element UL contenant tout les tags sélectionnés
const selectTagsListDOM = document.getElementById("select-tags-list");

const selectedListsDOMs = document.querySelectorAll(".selected-list");

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
function searchByInput() {
  //Input de recherche général
  const searchInput = document.getElementById("searchBar");

  const value = searchInput.value;

  console.log("input value: " + value);

  let result = [];

  if (value.length > 2) {
    result = searchArray(recipes, value);
  } else {
    result = recipes;
  }

  return result;
}

document.getElementById("searchBar").oninput = () => {
  searchResults = searchByInput();

  updateIndexDOM();
}

/**
 * Mets à jour l'affiche de la page index
 */
function updateIndexDOM() {
  updateFilterAll(tagsListDOM, selectedTagsList, searchResults);

  const gridDOM = document.getElementById("searchResult");

  while (gridDOM.firstChild) {
    gridDOM.removeChild(gridDOM.firstChild);
  }

  searchResults.forEach((recipe) => {
    const recipeDOM = getRecipeCardDOM(recipe);

    gridDOM.appendChild(recipeDOM);
  });

  tagsListDOM.forEach((list) => {
    list.childNodes.forEach((node) => {
      node.onclick = clickTag;
    });
  });

  selectTagsListDOM.childNodes.forEach((node) => {
    node.onclick = clickSelectedTags;
  });

  selectedListsDOMs.forEach((list) => {
    list.childNodes.forEach((node) => {
      node.onclick = clickSelectedTags;
    });
  })
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
    selectedTagsList[idList].splice(
      selectedTagsList[idList].indexOf(e.target.innerText),
      1
    );
  }
  searchResults = searchByInput();

  searchResults = searchAllTags(searchResults, selectedTagsList);

  updateIndexDOM();
}

/**
 * Fonction appelé lorsqu'on clique sur un tag sélectionné pour le supprimer de la liste (et mets à jour la recherche et le DOM)
 * @param {Event} e L'event généré par le clique
 */
function clickSelectedTags(e) {
  const element = e.target;

  const nomTag = element.innerText;

  for(let i in selectedTagsList) {

    let found = false;

    for(let j in selectedTagsList[i]){
      if(selectedTagsList[i][j] === nomTag){
        selectedTagsList[i].splice(selectedTagsList[i].indexOf(j), 1);
        found = true;
        element.parentNode.removeChild(element);
        break;
      }
    }

    if(found){
      break;
    }
  }

  searchResults = searchByInput();
  searchResults = searchAllTags(searchResults, selectedTagsList);

  updateIndexDOM();
}

function init() {
  updateIndexDOM();
}

init();
