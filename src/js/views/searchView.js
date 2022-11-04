
import { elements } from "./base"; // all DOM elements imported.




export const getInput = () => elements.searchInput.value; // to get the value the user entered for a search.


// to clear the search input field.
export const clearInputField = () => {
    elements.searchInput.value = ""; // set the value equal to nothing (i.e. empty).
};


// to clear the results from the previous search.
export const clearResults = () => {
    elements.resultsList.innerHTML = ""; // set to nothing, i.e. the li elements/tags will be deleted.
    elements.searchResultsPages.innerHTML = ""; // to clear out unwanted button.
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


// "page" parameter is the particular page number currently on, "type" refers to either button to go forward or go back.
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
        <span> Page ${type === "prev" ? page - 1 : page + 1} </span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
        </svg>
    </button>
`;


// function to render buttons based on a particular page.
const renderButtons = (page, numberofResults, resultsPerPage) => {
    const pages = Math.ceil(numberofResults / resultsPerPage);

    let button;

    if (page === 1 && pages > 1) { // if on page1 and there's more than one page.
        // only one button to the next page (i.e. page2).
        button = createButton(page, "next");
    } else if ( page < pages) { // if in one of the middle pages.
        // both previous and next buttons.
        button = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
        `;
    } else if (page === pages && pages > 1) { // if on the last page and there's more than one page.
        // only button to the previous page.
        button = createButton(page, "prev");
    }

    elements.searchResultsPages.insertAdjacentHTML("afterbegin", button); // to insert the buttons.

};


// for all recipes.
export const renderResults = (recipes, page =1, resultsPerPage = 10) => {
    // render results of current page.
    const start = (page - 1) * resultsPerPage; // from which recipe to start showing the results for a particular page.
    const end = page * resultsPerPage; // where to end showing the results.
    recipes.slice(start, end).forEach(renderRecipe); // loop through the recipes and call the "renderRecipe()" for each recipe.

    // render pagination.
    renderButtons(page, recipes.length, resultsPerPage);
};