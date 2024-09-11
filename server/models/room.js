"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.User, { foreignKey: "HostId", as: "Host ID" });
      Room.belongsTo(models.User, { foreignKey: "OpponentId", as: "Opponent ID" });
    }
  }
  Room.init(
    {
      HostId: DataTypes.INTEGER,
      OpponentId: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: "Waiting",
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Room",
    },
  );
  return Room;
};
