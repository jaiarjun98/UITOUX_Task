import SequelizeStatic from "sequelize";
import { AppConstants } from "../../config/constants.js";

export default (sequelize) => {
  return sequelize.define(
    "Category",
    {
      categoryid: {
        type: SequelizeStatic.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
      },
      categoryname: {
        type: SequelizeStatic.STRING(100),
        allowNull: false,
      },
      categorycode: {
        type: SequelizeStatic.STRING(50),
        allowNull: true,
      },
      status: {
        type: SequelizeStatic.STRING(10),
        defaultValue: AppConstants.STATUS_ACTIVE,
        allowNull: true,
      },
      createdby: {
        type: SequelizeStatic.STRING(50),
        allowNull: false,
      },
      createddt: {
        type: SequelizeStatic.DATE,
      },
      updatedby: {
        type: SequelizeStatic.STRING(50),
      },
      updateddt: {
        type: SequelizeStatic.DATE,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "tbl_product_category",
    }
  );
};
