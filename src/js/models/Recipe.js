
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

parseIngredients() {
    const unitsLong = ["tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "pounds"];
    const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound"];

    // creating new ingredients based of the old one.
    const newIngredients = this.ingredients.map( el => {
        // uniform units, all the units should be the same.
        let ingredient = el.toLowerCase();
        unitsLong.forEach( (unit, i) => { // "unit" stands for the current element and "i" for current index.
            ingredient = ingredient.replace(unit, unitsShort[i]);
        } );

        // remove parenthesis.
        ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

        // parse ingredients into count, unit and ingredient.
        const arrayIngredient = ingredient.split(" "); // to convert the ingredient into an array.
        const unitIndex = arrayIngredient.findIndex( ell => unitsShort.includes(ell) ); // to find the index at which the unitsShort is located.

        let objIngredient;
        if (unitIndex > -1 ) { // there's a unit.
            const arrayCount = arrayIngredient.slice(0, unitIndex);
            let count;

            if (arrayCount.length === 1 ) {
                count = eval(arrayIngredient[0].replace("-", "+"));
            } else {
                count = eval(arrayIngredient.slice(0, unitIndex).join("+"));
            }

            objIngredient = {
                count,
                unit: arrayIngredient[unitIndex],
                ingredient: arrayIngredient.slice(unitIndex + 1).join(" ")
            };

        } else if ( parseInt(arrayIngredient[0], 10 ) ) { //there's no unit but 1st ell is a number.

            objIngredient = {
                count: parseInt(arrayIngredient[0], 10 ),
                unit: "",
                ingredient: arrayIngredient.slice(1).join(" ")
            };

        } else if ( unitIndex === -1 ) { // there's no unit or number in the 1st position.

            objIngredient = {
                count: 1,
                unit: "",
                ingredient
            };

        }

        return objIngredient;
    } );
    this.ingredients = newIngredients;
}

};