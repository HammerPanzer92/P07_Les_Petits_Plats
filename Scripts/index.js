import { searchArray } from "./utils/search.js";
import { recipes } from "./Data/recipes.js";

const searchInput = document.getElementById("searchBar");

console.log(searchArray(recipes, "coco"));
