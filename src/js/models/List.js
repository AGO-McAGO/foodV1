
import uniqid from 'uniqid'; // to id recipes for likes or deletion functionality.


// shopping list.
export default class List {
    constructor() {
        this.items = [];
    }
    
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    };

    deleteItem(id) {
        // check if the id of the element is equal to the passed in id; in order to find the index of the id passed in.
        const index = this.items.findIndex(el => el.id === id);

        this.items.splice(index, 1); // to remove only 1 element. Start at the position(i.e. index) where the item is located and take out only 1 element.
    };

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }


};