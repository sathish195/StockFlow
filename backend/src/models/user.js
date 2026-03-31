module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
  
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
  
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        organizationId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        tableName: "users",
        timestamps: true,
        indexes: [
          { unique: true, fields: ["email"] },
          { fields: ["organizationId"] },
        ],
      }
    );
  
    return User;
  };