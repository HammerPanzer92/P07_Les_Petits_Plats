/**
 * Lance une recherche dans un tableau
 * @param {Array} array Le tableau où on souhaite faire la recherche
 * @param {String} input La valeur qu'on cherche
 * @returns {Array} Un tableau correspond au résultat de la recherche
 */
export function searchArray(array, input) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    var recipe = array[i];

    //On vérifie si la recherche correspond au nom ou a la description
    if (recipe.name.includes(input)) {
      result.push(recipe);
      continue;
    } else if (recipe.description.includes(input)) {
      result.push(recipe);
      continue;
    }

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const inputLow = input.toLowerCase();

      const nomIngredient = recipe.ingredients[j].ingredient.toLowerCase();

      if (inputLow === nomIngredient) {
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
