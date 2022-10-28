
import Search from "./models/Search";
import * as searchView from "./views/searchView"; // to import all of the variables and functions from the search view.
import { elements } from "./views/base"; // all DOM elements imported.

/*
GLOBAL STATE of the app.
* - Search object.
* - Current recipe object.
* - Shopping list object.
* - Liked recipes.
*/

const state = {};

const controlSearch = async () => {
    //1. get query from the view.
    const query = searchView.getInput();

    if ( query ) { // if there is a query.
        //2. create a new search object and add it to state.
        state.search = new Search(query);

        //3. prepare UI for results.
        searchView.clearInputField(); // to clear the input field.
        searchView.clearResults(); // clear results from the previous search.

        //4. search for recipes.
        await state.search.getResults();

        //5. render results on UI.
        searchView.renderResults(state.search.result);
        console.log(state.search.result);
    }

};

// event listener for user search.
elements.searchSubmit.addEventListener( "submit", e => { // whenever a user submits a search term ....
    e.preventDefault(); // .. prevent the default behaviour then
    controlSearch(); // .. call the controlSearch function.
} );