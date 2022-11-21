
// shopping list.
export default class Likes {
    constructor() {
        this.likes = [];
    }
    
    addLike(id, title, author, img) {
        const like = {id, title, author, img}; // create the like object.
        this.likes.push(like); // push it into the likes array.
        return like;
    };

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id); // same procedure as in the "list.js" file for the list.
        this.likes.splice(index, 1);
    };

    isLiked(id) { // method to indicate/show the user that they've liked a particular recipe.
        // check if the id of the element is equal to the passed in id; in order to find the index of the id passed in.
        return this.likes.findIndex(el => el.id === id) !== -1; 
    };

    getNumberLikes(id) { // to get the liked recipe.
        return this.likes.length;
    };


};