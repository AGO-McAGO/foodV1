
import { elements } from "./base"; // all DOM elements imported.




export const getInput = () => elements.searchInput.value; // to get the value the user entered for a search.


// to clear the search input field.
export const clearInputField = () => {
    elements.searchInput.value = ""; // set the value equal to nothing (i.e. empty).
};


// to clear the results from the previous search.
export const clearResults = () => {
    elements.resultsList.innerHTML = ""; // set to nothing, i.e. the li elements/tags will be deleted.
};


// to shorten the title with dots, if it's too long to be on one line.
const limitRecipeTitle = (title, limit = 15) => {
    const newTitle = [];
    if (title.length > limit) {
        /*
        to split the title by a space. The callback function is the 1st argument of the "reduce()" method with "acclt" stands for accumulator and
        "currV" stands for current value as parameters. The 2nd argument of the "reduce()" method is initial value of the accumulator which is "0".
        */
        title.split(" ").reduce( (acclt, currV) => {
            if (acclt + currV.length <= limit) {
                newTitle.push(currV);
            }
            return acclt + currV.length;
        }, 0 );
        return `${newTitle.join(" ")} ....`;
    }
    return title;

};


// to display only one recipe.
const renderRecipe = recipi => {
    // the template to display one recipe.
    const recipeMarkup = `
                <li>
                    <a class="results__link" href="#${recipi.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipi.image_url}" alt="${recipi.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipi.title)}</h4>
                            <p class="results__author">${recipi.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    // to insert the template into the webpage.
    elements.resultsList.insertAdjacentHTML("beforeend", recipeMarkup);
};


// for all recipes.
export const renderResults = recipes => {
    recipes.forEach(renderRecipe); // loop through the recipes and call the "renderRecipe()" for each recipe.
};