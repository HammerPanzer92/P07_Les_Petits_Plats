import { searchAllTags, searchArray } from "./utils/search.js";
import { recipes } from "./Data/recipes.js";
import { getRecipeCardDOM } from "./utils/recipes.js";
import { updateFilterAll } from "./utils/select.js";
import { checkLength, checkStr } from "./utils/security.js";

//Element UL contenant les tags (ingrédients, appareils etc...)
const tagsListDOM = document.querySelectorAll(".tags-list");

//Element UL contenant tout les tags sélectionnés
const selectTagsListDOM = document.getElementById("select-tags-list");

const selectedListsDOMs = document.querySelectorAll(".selected-list");

//Input de recherche dans les tags
const tagsInput = document.querySelectorAll(".tag-search-input");

//Container des listes de tags
const filterContainerDOM = document.getElementsByClassName("filter-container");

//Résultat de la recherche actuelle (pa défaut toute les recettes)
let searchResults = recipes;

//Listes des tags sélectionnés
const selectedTagsList = {
  "ingredients-list": [],
  "appliances-list": [],
  "ustensils-list": [],
};

document.getElementById("clear-search-input").onclick = (e) => {
  document.getElementById("searchBar").value = "";
  e.target.style.display = "none";
  searchResults = recipes;
  searchResults = searchAllTags(searchResults, selectedTagsList);
  updateIndexDOM();
};

document.getElementById("searchBar").oninput = (e) => {
  if (checkLength(e.target.value)) {
    document.getElementById("clear-search-input").style.display = "block";
  }
};

for (let i = 0; i < filterContainerDOM.length; i++) {
  const containerDOM = filterContainerDOM[i];

  const labelContainer = containerDOM.querySelector(".label-container");

  labelContainer.onclick = () => {
    containerDOM.classList.toggle("filter-open");
    containerDOM.classList.toggle("filter-close");
    for (let j = 0; j < filterContainerDOM.length; j++) {
      const element = filterContainerDOM[j];

      if (
        element != containerDOM &&
        element.classList.contains("filter-open")
      ) {
        element.classList.remove("filter-open");
        element.classList.add("filter-close");
      }
    }
  };
}

tagsInput.forEach((input) => {
  input.oninput = (e) => {
    const element = e.target;
    const type = element.id.split("-")[0];
    const listTarget = document.getElementById(type + "-list");
    if (checkLength(element.value) && checkStr(element.value)) {
      listTarget.childNodes.forEach((node) => {
        if (!node.innerText.includes(element.value)) {
          node.style.display = "none";
        } else {
          node.style.display = "list-item";
        }
      });
    } else {
      listTarget.childNodes.forEach((node) => {
        node.style.display = "list-item";
      });
    }
  };
});

/**
 * Lance une recherche basé via la valeur de l'input
 * @returns Le tableau de résultats si l'input contient une valeur sinon renvoie toutes les recettes
 */
function searchByInput() {
  //Input de recherche général
  const searchInput = document.getElementById("searchBar");

  const value = searchInput.value;

  let result = recipes;

  //Si il a plus de 2 caractères, on lance une recherche par mots (séparés via split())
  if (checkLength(value)) {
    const tabValues = value.split(" ");
    for (let i = 0; i < tabValues.length; i++) {
      if (checkLength(tabValues[i]) && checkStr(tabValues[i])) {
        result = searchArray(result, tabValues[i]);
      }
    }
  }
  return result;
}

document.getElementById("searchButton").onclick = () => {
  document.activeElement.blur();

  searchResults = searchByInput();

  updateIndexDOM();
};

/**
 * Mets à jour l'affiche de la page index
 */
function updateIndexDOM() {
  console.log("searcResults update :");
  console.log(searchResults);
  updateFilterAll(tagsListDOM, selectedTagsList, searchResults);

  tagsInput.forEach((input) => {
    input.value = "";
  });

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
  });

  document.querySelector(".recipes-counter").innerText =
    searchResults.length + " recettes";
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

  for (let i in selectedTagsList) {
    let found = false;

    for (let j in selectedTagsList[i]) {
      if (selectedTagsList[i][j] === nomTag) {
        selectedTagsList[i].splice(selectedTagsList[i].indexOf(nomTag), 1);
        found = true;
        element.parentNode.removeChild(element);
        break;
      }
    }

    if (found) {
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
