/**
 * Lance une recherche dans un tableau
 * @param {Array} array Le tableau où on souhaite faire la recherche
 * @param {String} input La valeur qu'on cherche
 * @returns {Array} Un tableau correspond au résultat de la recherche
 */
export function searchArray(array, input){
    return array.filter((recipe) =>{

        //On vérifie si la recherche correspond au nom ou a la description
        if(recipe.name.includes(input)){
            return true;
        }else if(recipe.description.includes(input)){
            return true;
        }
        
        let result = false;

        //On vérifie si la recherche correspond a un ingrédient
        recipe.ingredients.forEach((ingredient) => {
            if(ingredient.ingredient.includes(input)){
                result = true;
            }
        });

        return result;
    } )
}

/**
 * Recherche par ingrédients
 * @param {Array} array Tableau des recettes sur lequel cherché
 * @param {String} input L'ingrédient recherché
 * @returns Tableau contenant le résultat de la recherche
 */
export function searchByIngredient(array, input){
    return array.filter((recipe) =>{
        let result = false;

        //On vérifie si la recherche correspond a un ingrédient
        recipe.ingredients.forEach((ingredient) => {
            if(ingredient.ingredient.includes(input)){
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
export function searchByAppliance(array, input){
    return array.filter((recipe) => {
        if(recipe.appliance === input){
            return true;
        }else{
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
export function searchByUstensils(array, input){
    return array.filter((recipe) =>{
        let result = false;

        recipe.ustensils.forEach((ustensil) =>{
            if(ustensil === input){
                result = true;
            }
        });

        return result;
    });
}