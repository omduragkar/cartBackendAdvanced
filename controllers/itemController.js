const { response } = require("../helper/response");
const Item = require("../models/Item");

/**
 * @description: This function gets all the items
 * @param: req, res
 * @returns: response
 *  @URL: /api/items/ = GET
 */
module.exports.getItemsController = async (req, res) => {
    try {
        const Items = await Item.find();
        response(res, 200, "Success!", Items);
    } catch (err) {
        response(res, 500,  'Could not fetch products and services.', err, true);
    }
}

/**
 * @description: This function creates a item
 * @param: req, res
 * @returns: response
 *  @URL: /api/items/create = POST
 * 
 */
module.exports.createItemsController = async (req, res) => {
    const { name, price, type="PRODUCT" } = req.body;
    try {
        const createdItem = await Item.create({
            name,
            price,
            type
        });
        if(!createdItem){
            response(res, 500,  'Could not create products and services.', err, true);
        }
        else{
            response(res, 200, "Success!", createdItem);
        }
    } catch (err) {
        response(res, 500,  'Could not fetch products and services.', err, true);
    }
}