import SequelizeStatic from "sequelize";
import { AppConstants } from "../../config/constants.js";
export default (sequelize) => {
  return sequelize.define(
    "Productreview",
    {
      reviewid: {
        type: SequelizeStatic.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
      },
      productid: {
        type: SequelizeStatic.INTEGER(20),
        allowNull: false,
      },
      review: {
        type: SequelizeStatic.TEXT,
        allowNull: false,
      },
      userid: {
        type: SequelizeStatic.INTEGER(20),
        allowNull: false,
      },
      status: {
        type: SequelizeStatic.STRING(10),
        defaultValue: AppConstants.STATUS_ACTIVE,
      },
      createddt: {
        type: SequelizeStatic.DATE,
        allowNull: false,
      },
      createdby: {
        type: SequelizeStatic.STRING(50),
        allowNull: false,
      },
      lastupdateddt: {
        type: SequelizeStatic.DATE,
      },
      lastupdatedby: {
        type: SequelizeStatic.STRING(50),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "tbl_productreviews",
    }
  );
};
