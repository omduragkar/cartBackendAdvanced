const Item = require("../models/Item");
/**
 * @description: This is the helper function for finding items
 * @param: query
 * @returns: data
 */
const findItemHelper = async (query) => {
    try {
        const data = await Item.findOne(query);
        return data;
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    findItemHelper
}
