import SequelizeStatic from "sequelize";
import { AppConstants } from "../../config/constants.js";
import _ from "lodash";
import Password from "../../modules/password/index.js";
export default (sequelize) => {
  return sequelize.define(
    "User",
    {
      userid: {
        type: SequelizeStatic.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
      },
      profilename: {
        type: SequelizeStatic.STRING(50),
        allowNull: false,
      },
      emailid: {
        type: SequelizeStatic.INTEGER(100),
        allowNull: false,
      },
      loginid: {
        type: SequelizeStatic.STRING(100),
        allowNull: false,
      },
      fullname: {
        type: SequelizeStatic.STRING(256),
        allowNull: false,
      },
      loginpassword: {
        type: SequelizeStatic.STRING(256),
        set: function (data) {
          _.set(this, "dataValues.loginpassword", data);
          // If we need to encrypt we can do by enabling the below method.
          // _.set(this, "dataValues.loginpassword", Password.encrypt(data));
        },
        get: function () {
          let data;
          data = _.get(this, "dataValues.loginpassword");
          return data;
          // If we need to decrypt we can do by enabling the below method.
          // return Password.decrypt(data);
        },
      },
      mobileno: {
        type: SequelizeStatic.STRING(20),
        allowNull: true,
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
      tableName: "tbl_users",
    }
  );
};
