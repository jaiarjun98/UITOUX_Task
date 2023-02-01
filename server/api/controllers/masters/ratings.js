import { CommonService } from "../../services/index.js";
import { db, RespondModule } from "../../../modules/index.js";
import * as _ from "lodash";
import { AppConstants, AppMessages } from "../../../config/index.js";

export class Controller {
  constructor() {
    // Empty Constructor
  }

  // To list all the ratings based on the condition passed
  async all(req, res) {
    let respond = new RespondModule(req, res);
    try {
      let parameters = {};
      parameters.where = {};
      if (req.body != undefined) {
        parameters.where = req.body;
      }
      if (req.query.limit) parameters.limit = req.query.limit; // To get required records alone for pagination
      if (req.query.offset) parameters.offset = req.query.offset; // To get required records alon for pagination
      if (
        req.body == undefined ||
        req.body.status == undefined ||
        req.body.status == null
      ) {
        parameters.where["status"] = { $ne: AppConstants.STATUS_DELETED };
      }
      // Server level search based on Product Name and Part Number as per the Given Document
      CommonService.getCountAndList(parameters, db.Ratings)
        .then((list) => {
          respond.success(list, "");
        })
        .catch((error) => {
          respond.failed(
            AppConstants.STATUS_CODE[0],
            AppMessages.COMMON.FAILED.DEFAULT,
            error
          );
        });
    } catch (e) {
      respond.failed(
        AppConstants.STATUS_CODE[0],
        AppMessages.COMMON.FAILED.DEFAULT,
        e
      );
    }
  }

  // Create a Rating with appropriate details against product 

  async create(req, res) {
    const respond = new RespondModule(req, res);
    try {
      const data = req.body;
      if (data != undefined) {
        CommonService.create(req.body, db.Ratings)
          .then((result) => {
            // Calculate total average rating and update on Product Master table as AvgRating
            CommonService.getAllList(
              {
                where: {
                  productid: req.body.productid,
                  status: AppConstants.STATUS_ACTIVE,
                },
              },
              db.Ratings
            )
              .then((resultData) => {
                const ratingData = JSON.parse(JSON.stringify(resultData));
                let sum = ratingData.reduce((accumulator, curValue) => {
                  return accumulator + Number(curValue.rating);
                }, 0);
                const avgRating = sum / ratingData.length;
                CommonService.update(
                  { productid: req.body.productid },
                  { avgrating: avgRating },
                  db.Product
                );
                respond.success(
                  result,
                  "Product Ratings Created Successfully",
                  AppConstants.STATUS_CODE[1]
                );
              })
              .catch((err) => {
                respond.failed(AppConstants.STATUS_CODE[1], err, err);
              });
          })
          .catch((error) => {
            respond.failed(AppConstants.STATUS_CODE[1], error, error);
          });
      } else {
        respond.failed(
          AppConstants.STATUS_CODE[5],
          "Request Not available",
          "Request Not available"
        );
      }
    } catch (e) {
      respond.failed(
        AppConstants.STATUS_CODE[0],
        AppMessages.COMMON.FAILED.DEFAULT,
        e
      );
    }
  }

  // We can develop Delete and Update API function for Ratings if we required
}

export default new Controller();
