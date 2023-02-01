import SequelizeStatic from "sequelize";
import { AppConstants } from "../../config/constants.js";
export default (sequelize) => {
  return sequelize.define(
    "Product",
    {
      productid: {
        type: SequelizeStatic.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
      },
      productname: {
        type: SequelizeStatic.STRING(100),
        allowNull: false,
      },
      partnumber: {
        type: SequelizeStatic.STRING(100),
        allowNull: false,
      },
      productdesc: {
        type: SequelizeStatic.TEXT,
      },
      productweight: {
        type: SequelizeStatic.STRING(50),
        allowNull: true,
      },
      sku: {
        type: SequelizeStatic.STRING(50),
        allowNull: true,
      },
      avgrating: {
        type: SequelizeStatic.STRING(20),
        allowNull: true,
      },
      price: {
        type: SequelizeStatic.DECIMAL(20, 2),
        allowNull: false,
      },
      selltaxid: {
        type: SequelizeStatic.DECIMAL(20, 2),
        allowNull: true,
      },
      isfeatured: {
        type: SequelizeStatic.ENUM("Y", "N"),
        allowNull: true,
        defaultValue: "N",
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
      tableName: "tbl_products",
    }
  );
};
