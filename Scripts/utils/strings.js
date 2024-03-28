/**
 * Formatte la chaine en mettant tout en minuscule sauf la première lettre qui est mise en majuscule
 * @param {String} str La chaine a formatté
 * @returns La chaine formatté
 */
export function formatString(str) {
    let text = str.toLowerCase();

    const firstLetter = str.charAt(0).toUpperCase();

    text = text.slice(1);

    return firstLetter + text;
}