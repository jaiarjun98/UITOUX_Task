import { CommonService } from "../../services/index.js";
import { db, RespondModule, _ } from "../../../modules/index.js";
import { AppConstants, AppMessages } from "../../../config/index.js";

export class Controller {
  constructor() {
    // Empty Constructor
  }
  async signin(req, res) {
    let respond = new RespondModule(req, res);

    try {
      let condition = {};
      condition.where = {
        loginid: req.body.emailid,
        loginpassword: req.body.loginpassword,
        status: AppConstants.STATUS_ACTIVE,
      };
      condition.attributes = { exclude: ["password"] };
      CommonService.getData(condition, db.User)
        .then((data) => {
          if (data != null) {
            respond.success(data, "Sign in Successfully", AppConstants.STATUS_CODE[1]);
          } else {
            respond.failed(
              AppConstants.STATUS_CODE[1],
              AppMessages.SIGNIN.FAILED.INVALID,
              e
            );
          }
        })
        .catch((e) => {
          respond.failed(
            AppConstants.STATUS_CODE[1],
            AppMessages.SIGNIN.FAILED.INVALID,
            e
          );
        });
    } catch (e) {
      respond.failed(
        AppConstants.STATUS_CODE[0],
        AppMessages.COMMON.FAILED.DEFAULT,
        AppMessages.COMMON.FAILED.DEFAULT
      );
    }
  }
}

export default new Controller();
