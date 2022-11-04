
export const elements = {
    searchSubmit: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResults: document.querySelector(".results"),
    resultsList: document.querySelector(".results__list"),
    searchResultsPages: document.querySelector(".results__pages")
};


export const elementStrings = {
    loader: "loader"
};


// loader while waiting for results.
export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader); // to insert the loader.
};


// to get rid of the loader after results displayed.
export const removeLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader); // to remove the loader from the parent.
};