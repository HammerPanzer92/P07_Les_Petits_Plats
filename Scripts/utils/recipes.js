import { formatString } from "./strings.js";

/**
 * Créé la card pour la recette
 * @param {Object} recipe La recette
 * @returns L'élément DOM contenant les infos de la recette
 */
export function getRecipeCardDOM(recipe) {
  const imageSrc = "./Photos/" + recipe.image;

  const duration = recipe.time + "min";

  const article = document.createElement("article");

  const imageDOM = document.createElement("img");
  imageDOM.src = imageSrc;
  article.appendChild(imageDOM);

  const durationDOM = document.createElement("div");
  durationDOM.classList.add("duration-container");
  durationDOM.innerHTML = "<p>" + duration + "</p>";
  article.appendChild(durationDOM);

  const containerDOM = document.createElement("div");

  const titre = document.createElement("h1");
  titre.innerText = recipe.name;

  containerDOM.appendChild(titre);
  containerDOM.classList.add("card-content");

  const h2recetteDOM = document.createElement("h2");
  h2recetteDOM.innerHTML = "Recette";
  containerDOM.appendChild(h2recetteDOM);

  const description = document.createElement("p");
  description.innerText = recipe.description;

  containerDOM.appendChild(description);

  const h2Ingredient = document.createElement("h2");
  h2Ingredient.innerText = "Ingrédients";

  containerDOM.appendChild(h2Ingredient);

  const listeIngredients = document.createElement("div");
  listeIngredients.classList.add("card-liste-ingredient");

  recipe.ingredients.forEach((ingredient) => {
    const ligne = document.createElement("div");

    const nomIngredientDOM = document.createElement("p");
    nomIngredientDOM.classList.add("nom-ingredient");
    nomIngredientDOM.innerText = ingredient.ingredient;

    ligne.appendChild(nomIngredientDOM);

    const detailIngredientDOM = document.createElement("p");
    detailIngredientDOM.classList.add("detail-ingredient");

    let textDetail = "";
    if(ingredient.quantity){
      textDetail += ingredient.quantity;
    }
    if(ingredient.unit){
      textDetail += " " + ingredient.unit;
    }

    detailIngredientDOM.innerText = textDetail;

    ligne.appendChild(detailIngredientDOM);

    listeIngredients.appendChild(ligne);
  });

  containerDOM.appendChild(listeIngredients);

  article.appendChild(containerDOM);

  return article;
}

/**
 * Renvoie la liste des différents ingrédients (sans doublons) des recettes
 * @param {Array} recipes Le tableau contenant les recettes
 * @returns Un tableau contenant les ingrédients
 */
export function getListIngredients(recipes) {
  let ingredientList = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((i) => {
      const nomIngredient = formatString(i.ingredient);

      if (!ingredientList.includes(nomIngredient)) {
        ingredientList.push(nomIngredient);
      }
    });
  });

  return ingredientList;
}

/**
 * Renvoie la listes des appareils utilisés dans les recettes
 * @param {Array} recipes Le tableau des recettes
 * @returns Le tableau des appareils
 */
export function getListAppliance(recipes) {
  let applianceList = [];

  recipes.forEach((recipe) => {
    const nomAppareil = formatString(recipe.appliance);

    if (!applianceList.includes(nomAppareil)) {
      applianceList.push(nomAppareil);
    }
  });

  return applianceList;
}

/**
 * Renvoie la liste des ustensils utilisés dans les recettes
 * @param {Array} recipes Le tableau des recettes
 * @returns Le tableau des ustensils
 */
export function getListUstensils(recipes) {
  let ustensilsList = [];

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const nomUstensil = formatString(ustensil);

      if (!ustensilsList.includes(nomUstensil)) {
        ustensilsList.push(nomUstensil);
      }
    });
  });

  return ustensilsList;
}
