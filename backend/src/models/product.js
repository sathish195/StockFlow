module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
      "Product",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
  
        organizationId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
  
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        sku: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        description: {
          type: DataTypes.TEXT,
        },
  
        quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
  
        costPrice: {
          type: DataTypes.DECIMAL(10, 2),
        },
  
        sellingPrice: {
          type: DataTypes.DECIMAL(10, 2),
        },
  
        lowStockThreshold: {
          type: DataTypes.INTEGER,
        },
      },
      {
        tableName: "products",
        timestamps: true,
  
        indexes: [
          {
            unique: true,
            fields: ["organizationId", "sku"], // 🔥 important
          },
          { fields: ["organizationId"] },
          { fields: ["name"] },
          { fields: ["quantity"] },
        ],
      }
    );
  
    return Product;
  };