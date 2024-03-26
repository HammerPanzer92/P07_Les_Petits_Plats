/**
 * Lance une recherche dans un tableau
 * @param {Array} array Le tableau où on souhaite faire la recherche
 * @param {String} input La valeur qu'on cherche
 * @returns {Array} Un tableau correspond au résultat de la recherche
 */
export function searchArray(array, input) {

  const inputLow = input.toLowerCase();

  const result = [];

  for (let i = 0; i < array.length; i++) {
    var recipe = array[i];

    const nomRecipes = recipe.name.toLowerCase();

    const descRecipes = recipe.description.toLowerCase();

    //On vérifie si la recherche correspond au nom ou a la description
    if (nomRecipes.includes(inputLow)) {
      result.push(recipe);
      continue;
    } else if (descRecipes.includes(inputLow)) {
      result.push(recipe);
      continue;
    }

    for (let j = 0; j < recipe.ingredients.length; j++) {

      const nomIngredient = recipe.ingredients[j].ingredient.toLowerCase();

      if (nomIngredient.includes(inputLow)) {
        result.push(recipe);
        break;
      }
    }
  }

  return result;
}

/**
 * Recherche par ingrédients
 * @param {Array} array Tableau des recettes sur lequel cherché
 * @param {String} input L'ingrédient recherché
 * @returns Tableau contenant le résultat de la recherche
 */
export function searchByIngredient(array, input) {
  const result = [];
  const inputLow = input.toLowerCase();

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].ingredients.length; j++) {
      const nomIngredient = array[i].ingredients[j].ingredient.toLowerCase();

      if (inputLow === nomIngredient) {
        result.push(array[i]);
        break;
      }
    }
  }

  return result;
}

/**
 * Recherche par appareils
 * @param {Array} array Tableau des recettes sur lequel cherché
 * @param {String} input L'appareil recherché
 * @returns Tableau contenant le résultat de la recherche
 */
export function searchByAppliance(array, input) {
  const result = [];
  const inputLow = input.toLowerCase();

  for (let i = 0; i < array.length; i++) {
    const nomAppareil = array[i].appliance.toLowerCase();

    if (inputLow === nomAppareil) {
      result.push(array[i]);
    }
  }
  return result;
}

/**
 * Recherche par ustensils
 * @param {Array} array Tableau des recettes sur lequel cherché
 * @param {String} input L'ustensil recherché
 * @returns Tableau contenant le résultat de la recherche
 */
export function searchByUstensils(array, input) {
  const result = [];
  const inputLow = input.toLowerCase();

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].ustensils.length; j++) {
      const nomUstensil = array[i].ustensils[j].toLowerCase();

      if (inputLow === nomUstensil) {
        result.push(array[i]);
        break;
      }
    }
  }

  return result;
}

export function searchAllTags(array, tagsObject){
  let result = array;

  for (let i; i < tagsObject["ingredients-list"].length; i++){
    result = searchByIngredient(result, tagsObject["ingredients-list"][i]);
  }

  for (let i; i < tagsObject["appliances-list"].length; i++){
    result = searchByAppliance(result, tagsObject["appliances-list"][i]);
  }

  for (let i; i < tagsObject["ustensils-list"].length; i++){
    result = searchByUstensils(result, tagsObject["ustensils-list"][i]);
  }

  return result;
}
