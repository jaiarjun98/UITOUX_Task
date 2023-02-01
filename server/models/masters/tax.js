import SequelizeStatic from "sequelize";
import { AppConstants } from "../../config/constants.js";
export default (sequelize) => {
  return sequelize.define(
    "taxes",
    {
      taxid: {
        type: SequelizeStatic.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
      },
      taxcode: {
        type: SequelizeStatic.DECIMAL(20, 2),
        allowNull: true,
      },
      taxprcnt: {
        type: SequelizeStatic.STRING(50),
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
      tableName: "tbl_product_taxes",
    }
  );
};
