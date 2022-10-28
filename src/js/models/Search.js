
import axios from "axios"; // "axios" used to enable making requests since "fetch" doesn't work in all browsers.

export default class Search {

    constructor(query) {
        this.query = query;
    }
    
    async getResults() {

    try {
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        this.result = result.data.recipes;
        //console.log(this.result);
    } catch (error) {
        console.log("An error occured:" + error);
        alert(error);
    }

};

};