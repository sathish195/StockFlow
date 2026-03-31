const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

// import models
const UserModel = require("./user.js");
const OrganizationModel = require("./organization.js");
const ProductModel = require("./product.js");

// initialize
const User = UserModel(sequelize, DataTypes);
const Organization = OrganizationModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);

// 🔥 RELATIONSHIPS

Organization.hasMany(User, {
  foreignKey: "organizationId",
  onDelete: "CASCADE",
});
User.belongsTo(Organization, {
  foreignKey: "organizationId",
});

Organization.hasMany(Product, {
  foreignKey: "organizationId",
  onDelete: "CASCADE",
});
Product.belongsTo(Organization, {
  foreignKey: "organizationId",
});

module.exports = {
  sequelize,
  User,
  Organization,
  Product,
};