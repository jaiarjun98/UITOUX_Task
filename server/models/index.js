import Sequelize from "sequelize";
import { databaseConfig } from "../config/db.js";
import {
  UserModel,
  CategoryModel,
  ProductModel,
  ProductReviewModel,
  TaxModel,
  UserRatingsModel,
} from "./masters/index.js";
let dbConfig = databaseConfig;

// DB connectivity usin Sequelize method
const dbConnectivity = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);
// Model defining
const models = {
  dbConnectivity,
  Sequelize,
  User: UserModel(dbConnectivity),
  Product: ProductModel(dbConnectivity),
  ProdCategory: CategoryModel(dbConnectivity),
  ProductReview: ProductReviewModel(dbConnectivity),
  Tax: TaxModel(dbConnectivity),
  Ratings: UserRatingsModel(dbConnectivity),
};
for (const key in databaseConfig) {
  if (databaseConfig.hasOwnProperty(key)) {
    const element = databaseConfig[key];
    if (element.associate) {
      element.associate(databaseConfig);
    }
  }
}
// Associations defining
models.Product.hasMany(models.ProductReview, {
  as: "prodreview",
  foreignKey: "productid",
});
models.Product.hasMany(models.Ratings, {
  as: "userrating",
  foreignKey: "productid",
});
models.Product.hasMany(models.Tax, {
  as: "taxes",
  foreignKey: "taxid",
});

// We can do implement the belongsTo, HasOne, etc method based on our requirement

export default models;
