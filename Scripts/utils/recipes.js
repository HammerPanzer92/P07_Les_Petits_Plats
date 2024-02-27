/**
 * Créé la card pour la recette
 * @param {Object} recipe La recette
 * @returns L'élément DOM contenant les infos de la recette
 */
export function getRecipeCardDOM(recipe) {
  const article = document.createElement("article");
  const titre = document.createElement("h1");
  titre.innerText = recipe.name;

  article.appendChild(titre);

  const description = document.createElement("p");
  description.innerText = recipe.description;

  article.appendChild(description);

  const listeIngredients = document.createElement("ul");

  recipe.ingredients.forEach((ingredient) => {
    const ligne = document.createElement("li");

    ligne.innertText = "";
    if(ingredient.quantity){
        ligne.innerText += ingredient.quantity + " ";
    }
    if(ingredient.unit){
        ligne.innerText += ingredient.unit + " de ";
    }
    ligne.innerText += ingredient.ingredient

    listeIngredients.appendChild(ligne);
  });

  article.appendChild(listeIngredients);

  return article;
}

/**
 * Renvoie la liste des différents ingrédients (sans doublons) des recettes
 * @param {Array} recipes Le tableau contenant les recettes
 * @returns Un tableau contenant les ingrédients
 */
export function getListIngredients(recipes) {
  let ingredientList = [];

  for(let i = 0; i < recipes.length; i++) {
    for(let j = 0; j < recipes[i].ingredients.length; j++){

        const nomIngredient = recipes[i].ingredients[j].ingredient.toLowerCase();

        if (!ingredientList.includes(nomIngredient)){
            ingredientList.push(recipes[i].ingredients[j].ingredient);
        }
    }
  }

  console.log(ingredientList);

  return ingredientList;
}

/**
 * Renvoie la listes des appareils utilisés dans les recettes
 * @param {Array} recipes Le tableau des recettes
 * @returns Le tableau des appareils
 */
export function getListAppliance(recipes) {
  let applianceList = [];

  for(let i = 0; i < recipes.length; i++) {
    if(!applianceList.includes(recipes[i].appliance)){
        applianceList.push(recipes[i].appliance);
    }
  }

  return applianceList;
}

/**
 * Renvoie la liste des ustensils utilisés dans les recettes
 * @param {Array} recipes Le tableau des recettes
 * @returns Le tableau des ustensils
 */
export function getListUstensils(recipes) {
  let ustensilsList = [];

  for(let i = 0; i < recipes.length; i++){
    for(let j = 0; j < recipes[i].ustensils.length; j++){
        if(!ustensilsList.includes(recipes[i].ustensils[j])){
            ustensilsList.push(recipes[i].ustensils[j]);
        }
    }
  }

  return ustensilsList;
}
