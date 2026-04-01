

// validations for user data
const Joi = require("joi");

module.exports = {
    signup: (data) => {
    const schema = Joi.object({
        name : Joi.string().min(1).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        organizationName: Joi.string().min(1).max(255).required(),
      });
    return schema.validate(data);
    },
    loging: (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });
    return schema.validate(data);
  },



  productSchema: (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        sku: Joi.string().required(),
        description: Joi.string().allow("", null),
        quantity: Joi.number().integer().min(0).required(),
        costPrice: Joi.number().optional(),
        sellingPrice: Joi.number().optional(),
        lowStockThreshold: Joi.number().integer().optional(),
      });
    return schema.validate(data);
  },
  
};