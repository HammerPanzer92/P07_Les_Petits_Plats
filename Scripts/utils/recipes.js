/**
 * Créé la card pour la recette
 * @param {Object} recipe La recette
 * @returns L'élément DOM contenant les infos de la recette
 */
export function getRecipeCardDOM(recipe){
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

      return article;
}

/**
 * Renvoie la liste des différents ingrédients (sans doublons) des recettes
 * @param {Array} recipes Le tableau contenant les recettes
 * @returns Un tableau contenant les ingrédients
 */
export function getListIngredients(recipes){
    let ingredientList = [];

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((i) => {
            if(!ingredientList.includes(i.ingredient)){
                ingredientList.push(i.ingredient);
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
export function getListAppliance(recipes){
    let applianceList = [];

    recipes.forEach((recipe) => {
        if(!applianceList.includes(recipe.appliance)){
            applianceList.push(recipe.appliance);
        }
    });

    return applianceList;
}

/**
 * Renvoie la liste des ustensils utilisés dans les recettes
 * @param {Array} recipes Le tableau des recettes
 * @returns Le tableau des ustensils
 */
export function getListUstensils(recipes){
    let ustensilsList = [];

    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            if(!ustensilsList.includes(ustensil)){
                ustensilsList.push(ustensil);
            }
        });
    });

    return ustensilsList;
}