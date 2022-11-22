
import { elements } from "./base";
import { limitRecipeTitle } from "./searchView"; // import function to shorten recipe title in the likes menu.


export const toggleLikeButton = isLiked => {
    const icoN = isLiked ? "icon-heart" : "icon-heart-outlined"; // if the recipe is liked it should be "icon-heart", if not it should be "icon-heart-outlined"
    document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${icoN}`);
};


// function to show the love/likes menu icon only when there are liked recipes.
export const toggleLikeMenu = numberOfLikes => {
    elements.likesMenu.style.visibility = numberOfLikes > 0 ? "visible" : "hidden"; // show menu only when number of likes is greater than 0.
};


// rendering the like to the UI.
export const renderLike = like => {
    const likeMarkup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                   <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name"> ${limitRecipeTitle(like.title)} </h4>
                 <p class="likes__author"> ${like.author} </p>
             </div>
        </a>
     </li>
    `;
    
    elements.likesList.insertAdjacentHTML("beforeend", likeMarkup);
};


// to delete liked recipe from the UI.
export const deleteLike = id => {
    // to select likes links with the particular id passed in, and remove/delete the entire "li" element (i.e. the recipe).
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};