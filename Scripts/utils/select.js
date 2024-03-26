import {
  getListIngredients,
  getListAppliance,
  getListUstensils,
} from "./recipes.js";

const selectTagsListDOM = document.getElementById("select-tags-list");

const selectedListsDOM = document.querySelectorAll(".selected-list");

/**
 * Mets à jour d'un select pour afficher les options souhaités
 * @param {HTMLUListElement} ULDom Element DOM de la liste a modifié
 * @param {Object} tagsList Liste des tags sélectionné
 * @param {Array} searchResults Liste des recettes sur laquelle effectué la recherche
 */
export function updateFilterSelect(ulDOM, tagsList, searchResults) {
  while (ulDOM.firstChild) {
    ulDOM.removeChild(ulDOM.firstChild);
  }

  const ulId = ulDOM.id;

  let resultTags = [];

  const selectedListId = "selected-" + ulId.split("-")[0];

  const selectedListDOM = document.getElementById(selectedListId);

  switch (ulId) {
    case "ingredients-list":
      resultTags = getListIngredients(searchResults);
      break;
    case "appliances-list":
      resultTags = getListAppliance(searchResults);
      break;
    case "ustensils-list":
      resultTags = getListUstensils(searchResults);
      break;
    default:
      break;
  }

  resultTags.forEach((tag) => {
    const line = document.createElement("li");
    line.innerText = tag;

    //Ajout de la classe si tag in tagslist
    if (tagsList[ulId].includes(tag)) {
      const lineSelectedList = line.cloneNode(true);

      selectTagsListDOM.appendChild(line);
      selectedListDOM.appendChild(lineSelectedList);
    } else {
      ulDOM.appendChild(line);
    }
  });
}

/**
 * Mets à jour tout les select a partir d'un tableau de recettes
 * @param {Array} listDOM Tableau contenant les <ul> a mettre a jour
 * @param {Object} listTags Liste des tags sélectionner
 * @param {Array} searchResults Liste des recettes
 */
export function updateFilterAll(listDOM, listTags, searchResults) {
  while (selectTagsListDOM.firstChild) {
    selectTagsListDOM.removeChild(selectTagsListDOM.firstChild);
  }

  selectedListsDOM.forEach((element) => {
    while(element.firstChild){
      element.removeChild(element.firstChild);
    }
  })

  listDOM.forEach((node) => {
    updateFilterSelect(node, listTags, searchResults);
  });
}
