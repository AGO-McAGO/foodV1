
import { elements } from "./base"; // all DOM elements imported.


export const renderItem = item => { // to render the item to the DOM (i.e. to the shopping list).
    const itemMarkup = `
    <li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
    </li>
    `;
    
    elements.shoppingList.insertAdjacentHTML("beforeend", itemMarkup);
};


export const deleteItem = id => { // to delete an item from the shopping list.
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item); // to delete the item.
};