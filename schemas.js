const joi = require("joi");

module.exports.campgroundsSchema = joi.object({
    campground:joi.object({
        title:joi.string().required(),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        image:joi.string().required(),
        description:joi.string().required()
    }).required()
})