
import { elements } from "./base"; // all DOM elements imported.
import { Fraction } from "fractional"; // to help with recipe calculations.


// to clear up the old recipe inorder to make way for the new one the user just clicked upon.
export const clearRecipe = () => {
    elements.recipe.innerHTML = "";
};


const formatCount = count => { // to calculate the recipe based on fractions.
    if (count) {
        const [int, dec] = count.toString().split(".").map(el => parseInt(el, 10));
        if (!dec) return count;

        if (int === 0) {
            const fractn = new Fraction(count);
            return `${fractn.numerator}/${fractn.denominator}`;
        } else {
            const fractn = new Fraction(count - int);
            return `${int} ${fractn.numerator}/${fractn.denominator}`;
        }

    }
    return "?";
};


// to display only one recipe.
export const renderRecipe = recipi => {
    const createIngredient = ingredient => `
    <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${formatCount(ingredient.count)}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${ingredient.unit}</span>
                    ${ingredient.ingredient}
                </div>
    </li>
    `;

    // the template to display one recipe.
    const recipeMarkup = `
    <figure class="recipe__fig">
        <img src="${recipi.img}" alt="${recipi.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span> ${recipi.title} </span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes"> ${recipi.time} </span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people"> ${recipi.servings} </span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart-outlined"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
        ${recipi.ingredients.map(el => createIngredient(el) ).join("") }
        </ul>

        <button class="btn-small recipe__btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipi.author}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipi.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    
    `;
    // to insert the template into the webpage.
    elements.recipe.insertAdjacentHTML("afterbegin", recipeMarkup);
};


export const updateServingsIngredients = recipe => {
    // update the servings, by changing the text content increasely or decreasely, according to user clicks.
    document.querySelector(".recipe__info-data--people").textContent = recipe.servings;

    // update the ingredients.
    const countElements = Array.from(document.querySelectorAll(".recipe__count") );
    countElements.forEach( (el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    } );

};