
export default class Likes {
    constructor() {
        this.likes = [];
    }
    
    addLike(id, title, author, img) {
        const like = {id, title, author, img}; // create the like object.
        this.likes.push(like); // push it into the likes array.
        this.persistData(); // persist the data into local storage.
        return like;
    };

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id); // same procedure as in the "list.js" file for the list.
        this.likes.splice(index, 1); // delete one, the liked recipe.
        this.persistData();// persist the delete in the local storage.
    };

    isLiked(id) { // method to indicate/show the user that they've liked a particular recipe.
        // check if the id of the element is equal to the passed in id; in order to find the index of the id passed in.
        return this.likes.findIndex(el => el.id === id) !== -1; 
    };

    getNumberLikes(id) { // to get the liked recipes.
        return this.likes.length;
    };

    persistData() { // to persist data in local storage.
        localStorage.setItem( "likes", JSON.stringify(this.likes) ); // to convert it into json format for storage in local storage.
    };

    readStorage() { // to persist data in local storage.
        const storage = JSON.parse( localStorage.getItem("likes") ); // to convert it back from json format.
        if (storage) this.likes = storage; // restoring the "likes" from localStorage; get the likes from the local storage if there are likes in the local storage.
    };


};