module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define(
      "Organization",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "organizations",
        timestamps: true,
        indexes: [{ fields: ["name"] }],
      }
    );
  
    return Organization;
  };