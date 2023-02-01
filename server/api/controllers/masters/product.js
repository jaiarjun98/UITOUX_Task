import { CommonService } from "../../services/index.js";
import { db, RespondModule } from "../../../modules/index.js";
import * as _ from "lodash";
import { AppConstants, AppMessages } from "../../../config/index.js";

export class Controller {
  constructor() {
    // Empty Constructor
  }

  // To list all the products based on the condition passed : Isfeatured, Search Function,
  async all(req, res) {
    let respond = new RespondModule(req, res);
    try {
      let parameters = {};
      parameters.where = {};
      parameters.include = [
        {
          model: db.ProductReview,
          as: "prodreview",
          required: false,
          paranoid: false,
        },
      ];

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
      if (req.body.searchtext != undefined && req.body.searchtext != null) {
        let searchparams = {};
        searchparams.productname = { $like: "%" + req.body.searchtext + "%" };
        searchparams.partnumber = { $like: "%" + req.body.searchtext + "%" };
        parameters.where["$or"] = searchparams;
        delete parameters.where.searchtext;
      }
      CommonService.getCountAndList(parameters, db.Product)
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

  // Create a product with appropriate details

  async create(req, res) {
    let respond = new RespondModule(req, res);
    try {
      let condition = {};
      condition.where = {
        productname: req.body.productname,
        partnumber: req.body.partnumber,
        status: AppConstants.STATUS_ACTIVE,
      };
      CommonService.getData(condition, db.Product)
        .then((data) => {
          if (data == null) {
            CommonService.create(req.body, db.Product)
              .then((result) => {
                respond.success(
                  result,
                  "Product Created Successfully",
                  AppConstants.STATUS_CODE[1]
                );
              })
              .catch((error) => {
                respond.failed(
                  AppConstants.STATUS_CODE[1],
                  AppMessages.COMMON.FAILED.ALREADYEXIST,
                  error
                );
              });
          } else {
            respond.failed(
              AppConstants.STATUS_CODE[1],
              AppMessages.COMMON.FAILED.ALREADYEXIST,
              AppMessages.COMMON.FAILED.ALREADYEXIST
            );
          }
        })
        .catch((e) => {
          respond.failed(AppConstants.STATUS_CODE[1], e, e);
        });
    } catch (e) {
      respond.failed(
        AppConstants.STATUS_CODE[0],
        AppMessages.COMMON.FAILED.DEFAULT,
        AppMessages.COMMON.FAILED.DEFAULT
      );
    }
  }

  // To get Specific product itself
  byId(req, res) {
    let respond = new RespondModule(req, res);
    let condition = {};
    condition.where = { productid: req.params.id };
    try {
      condition.include = [
        {
          model: db.ProductReview,
          as: "prodreview",
          required: false, //to defined whether left join or innerjoin
          paranoid: false, //to defined whether left join or innerjoin
          attributes: ["reviewid", "review"], // We can pass the Attributes condition to retrieve those columns alone
        },
        {
          model: db.Ratings,
          as: "userrating",
          required: false,
          paranoid: false, 
        },
        {
          model: db.Tax,
          as: "taxes",
          required: false,
          paranoid: false,
        },
      ];
      CommonService.getData(condition, db.Product)
        .then((data) => {
          respond.success(data, "");
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

  // We can develop Delete and Update API function for Product if we required
}

export default new Controller();
