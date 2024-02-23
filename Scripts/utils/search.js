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