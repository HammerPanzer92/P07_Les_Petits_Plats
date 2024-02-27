/**
 * Lance une recherche dans un tableau
 * @param {Array} array Le tableau où on souhaite faire la recherche
 * @param {String} input La valeur qu'on cherche
 * @returns {Array} Un tableau correspond au résultat de la recherche
 */
export function searchArray(array, input) {
  const inputLow = input.toLowerCase();

  return array.filter((recipe) => {

    const nom = recipe.name.toLowerCase();

    const desc = recipe.description.toLowerCase();

    //On vérifie si la recherche correspond au nom ou a la description
    if (nom.includes(inputLow)) {
      return true;
    } else if (desc.includes(inputLow)) {
      return true;
    }

    let result = false;

    //On vérifie si la recherche correspond a un ingrédient
    recipe.ingredients.forEach((ingredient) => {
      const nomIngredient = ingredient.ingredient.toLowerCase()

      if (nomIngredient.includes(inputLow)) {
        result = true;
      }
    });

    return result;
  });
}

/**
 * Recherche par ingrédients
 * @param {Array} array Tableau des recettes sur lequel cherché
 * @param {String} input L'ingrédient recherché
 * @returns Tableau contenant le résultat de la recherche
 */
export function searchByIngredient(array, input) {
  const inputLow = input.toLowerCase();

  return array.filter((recipe) => {
    let result = false;

    //On vérifie si la recherche correspond a un ingrédient
    recipe.ingredients.forEach((ingredient) => {
      const nomIngredient = ingredient.ingredient.toLowerCase();
      if (inputLow === nomIngredient) {
        result = true;
      }
    });

    return result;
  });
}

/**
 * Recherche par appareils
 * @param {Array} array Tableau des recettes sur lequel cherché
 * @param {String} input L'appareil recherché
 * @returns Tableau contenant le résultat de la recherche
 */
export function searchByAppliance(array, input) {
  const inputLow = input.toLowerCase();

  return array.filter((recipe) => {
    const nomAppareil = recipe.appliance.toLowerCase()

    if (nomAppareil === inputLow) {
      return true;
    } else {
      return false;
    }
  });
}

/**
 * Recherche par ustensils
 * @param {Array} array Tableau des recettes sur lequel cherché
 * @param {String} input L'ustensil recherché
 * @returns Tableau contenant le résultat de la recherche
 */
export function searchByUstensils(array, input) {
  const inputLow = input.toLowerCase();

  return array.filter((recipe) => {
    let result = false;

    recipe.ustensils.forEach((ustensil) => {
      if (ustensil.toLowerCase() === inputLow) {
        result = true;
      }
    });

    return result;
  });
}
