
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView"; // to import all of the variables and functions from the search view file.
import * as recipeView from "./views/recipeView"; // to import all of the variables and functions from the recipe view file.
import { elements, removeLoader, renderLoader } from "./views/base"; // all DOM elements imported.

/*
GLOBAL STATE of the app.
* - Search object.
* - Current recipe object.
* - Shopping list object.
* - Liked recipes.
*/

const state = {};

const controlSearch = async () => { // SEARCH CONTROLLER
    // get query from the view.
    const query = searchView.getInput();

    if ( query ) { // if there is a query.
        // create a new search object and add it to state.
        state.search = new Search(query);

        // prepare UI for results.
        searchView.clearInputField(); // to clear the input field.
        searchView.clearResults(); // clear results from the previous search.
        renderLoader(elements.searchResults); // to render the loader, while waiting for the results; "".

        try {
            // search for recipes.
            await state.search.getResults();
        
            // render results on UI.
            removeLoader(); // to remove the loader before rendering the results.
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert("An error occured!");
            removeLoader(); // to get rid of the loader when there's no results.
        }

    }

};


// listener for user search.
elements.searchSubmit.addEventListener( "submit", e => { // whenever a user submits a search term ....
    e.preventDefault(); // .. prevent the default behaviour then
    controlSearch(); // .. call the controlSearch function.
} );


// listener for pagination.
elements.searchResultsPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10); // "parseInt" to convert the number string to a number.
        searchView.clearResults(); // clear results from the previous search.
        searchView.renderResults(state.search.result, gotoPage); // results with pagination.
    }
    
} );


const controlRecipe = async () => { // RECIPE CONTROLLER
    // get the hash (which will become the "id") of a recipe (from the url), then replace "#" with nothing inorder to get only the numbers from the hash.
    const id = window.location.hash.replace("#", "");
    console.log(id);

    if ( id ) {
        // prepare the UI for changes.
        recipeView.clearRecipe(); // clear the old recipe, making way  for the new one clicked upon.
        renderLoader(elements.recipe)// render the loader with the parent (i.e. "elements.recipe") passed in so the loader knows where to display itself.

        // highlight the selected search item.
        if (state.search) searchView.highlightSelected(id);

        // create new recipe object.
        state.recipe = new Recipe(id);

        try {
            // get recipe data and parse ingredients.
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
        
            // calculate servings and time.
            state.recipe.cookTime();
            state.recipe.calculateServings();
        
            // render the recipe.
            removeLoader(); // 1st remove the loader.
            recipeView.renderRecipe(state.recipe); // render the recipe which is inside "state.recipe".
        } catch(error) {
            alert("An error occured will processing recipe");
        }
        
    }

};


// event listener to get hash from url when a recipe is clicked and event listener for whenever the page reloads. All events will call the "controlRecipe" function.
[ "hashchange", "load" ].forEach( event => window.addEventListener( event, controlRecipe ) );


// handling recipe button clicks.
elements.recipe.addEventListener("click", e => {
    // if button clicked upon is the button decrease or any child elements of the button decrease (which is what ".btn-decrease *" means).
    if ( e.target.matches(".btn-decrease, .btn-decrease *") ) {

        // to decrease the servings only if the servings is more/greater than 1.
        if ( state.recipe.servings > 1 ) {
            state.recipe.updateServings("decrease");
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if ( e.target.matches(".btn-increase, .btn-increase *") ) { // if button clicked upon is the button decrease or any child elements of the button decrease
        state.recipe.updateServings("increase");
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);

} );