

// validations for user data
const Joi = require("joi");

module.exports = {
    signup: (data) => {
    const schema = Joi.object({
        name : Joi.string().min(1).max(255).lowercase().required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).required(),
        organizationName: Joi.string().min(1).max(255).required(),
      });
    return schema.validate(data);
    },
    loging: (data) => {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).lowercase().required(),
      });
    return schema.validate(data);
  },



  productSchema: (data) => {
    const schema = Joi.object({
        name: Joi.string().lowercase().required(),
        sku: Joi.string().lowercase().required(),
        description: Joi.string().lowercase().allow("", null),
        quantity: Joi.number().integer().min(0).required(),
        costPrice: Joi.number().optional(),
        sellingPrice: Joi.number().optional(),
        lowStockThreshold: Joi.number().integer().optional(),
      });
    return schema.validate(data);
  },
  
};