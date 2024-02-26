import { searchArray } from "./utils/search.js";
import { recipes } from "./Data/recipes.js";

const searchInput = document.getElementById("searchBar");

const divGrid = document.querySelector(".Recettes-grid");

searchInput.oninput = () => {
  if (searchInput.value.length > 2) {

    while(divGrid.firstChild){
        divGrid.removeChild(divGrid.firstChild);
    }

    let resultSearch = searchArray(recipes, searchInput.value);

    resultSearch.forEach((result) => {
      const article = document.createElement("article");
      const titre = document.createElement("h1");
      titre.innerText = result.name;

      article.appendChild(titre);

      const description = document.createElement("p");
      description.innerText = result.description;

      article.appendChild(description);

      const listeIngredients = document.createElement("ul");

      result.ingredients.forEach((ingredient) => {
        const ligne = document.createElement("li");

        if (ingredient.unit) {
          ligne.innerText =
            ingredient.quantity +
            " " +
            ingredient.unit +
            " de " +
            ingredient.ingredient;
        } else {
          ligne.innerText = ingredient.quantity + "  " + ingredient.ingredient;
        }

        listeIngredients.appendChild(ligne);
      });

      article.appendChild(listeIngredients);

      divGrid.appendChild(article);
    });
  } else if (searchInput.value.length == 0) {
    while(divGrid.firstChild){
        divGrid.removeChild(divGrid.firstChild);
    }

    recipes.forEach((recipes) => {
      const article = document.createElement("article");
      const titre = document.createElement("h1");
      titre.innerText = recipes.name;

      article.appendChild(titre);

      const description = document.createElement("p");
      description.innerText = recipes.description;

      article.appendChild(description);

      const listeIngredients = document.createElement("ul");

      recipes.ingredients.forEach((ingredient) => {
        const ligne = document.createElement("li");

        if (ingredient.unit) {
          ligne.innerText =
            ingredient.quantity +
            " " +
            ingredient.unit +
            " de " +
            ingredient.ingredient;
        } else {
          ligne.innerText = ingredient.quantity + "  " + ingredient.ingredient;
        }

        listeIngredients.appendChild(ligne);
      });

      article.appendChild(listeIngredients);

      divGrid.appendChild(article);
    });
  }
};

