import {
  getListIngredients,
  getListAppliance,
  getListUstensils,
} from "./recipes.js";

/**
 * Mets à jour d'un select pour afficher les options souhaités
 * @param {HTMLUListElement} ULDom Element DOM de la liste a modifié
 * @param {Object} tagsList Liste des tags sélectionné
 * @param {Array} searchResultst Liste des recettes sur laquelle effectué la recherche
 */
export function updateFilterSelect(ulDOM, tagsList, searchResults) {
  while (ulDOM.firstChild) {
    ulDOM.removeChild(ulDOM.firstChild);
  }

  const ulId = ulDOM.id;

  let resultTags = [];

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

  console.log(resultTags);

  resultTags.forEach((tag) =>{
    const line = document.createElement("li");
    line.innerText = tag;

    //Ajout de la classe si tag in tagslist
    if(tagsList[ulId].includes(tag)){
      console.log("Found"); 
    }

    ulDOM.appendChild(line);
  })
}

/**
 * Mets à jour tout les select a partir d'un tableau de recettes
 * @param {Array} listDOM Tableau contenant les <ul> a mettre a jour
 * @param {Object} listTags Liste des tags sélectionner
 * @param {Array} searchResults Liste des recettes
 */
export function updateFilterAll(listDOM, listTags, searchResults) {
  listDOM.forEach((node) => {
    updateFilterSelect(node, listTags, searchResults);
  });
}
