/**
 * Vérifie la longueur d'une chaine
 * @param {String} value La valeur a vérifié
 * @param {Number} length La longeur souhaité (Par défaut défini a 3)
 * @returns True si la valeur est égal ou supérieur a la longeur, sinon retourne false
 */
export function checkLength(value, length = 3) {
    return value.length >= length;  
}

/**
 * Vérifie que la chaine contient bien que des caratéres valides (a-zA-Zèéç àêâ) 
 * @param {String} value La chaine a vérifié
 * @returns True si la chaine est valide, False dans le cas contraire
 */
export function checkStr(value){
    const numRegex = new RegExp("[^a-zA-Zèéç àêâ]");
    return !numRegex.test(value);
}