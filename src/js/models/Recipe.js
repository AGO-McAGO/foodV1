
import axios from "axios";


// "Recipe" class to hold all the data for one recipe object.
export default class Recipe {

    constructor(id) { // the id of a particular recipe.
        this.id = id;
    }
    
    async getRecipe() {

    try {
        const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`); // returns the details about a specific recipe.
        this.title = result.data.recipe.title;
        this.author = result.data.recipe.publisher;
        this.img = result.data.recipe.image_url;
        this.url = result.data.recipe.source_url;
        this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
        console.log("An error occured:" + error);
        alert(error);
    }

};

// calculating the time it takes to cook.
cookTime() {
    // assuming 15mins is needed for each 3 ingredients.
    const numberOfIngredients = this.ingredients.length;
    const period = Math.ceil(numberOfIngredients / 3);
    this.time = period * 15;
}

// servings.
calculateServings() {
    this.servings = 4;
}

};