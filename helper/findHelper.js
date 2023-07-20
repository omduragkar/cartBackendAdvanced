const Item = require("../models/Item");

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
