import { CommonService } from "../../services/index.js";
import { db, RespondModule, _ } from "../../../modules/index.js";
import { AppConstants, AppMessages } from "../../../config/index.js";

export class Controller {
  constructor() {
    // Empty Constructor
  }
  async signup(req, res) {
    let respond = new RespondModule(req, res);
    try {
      let data = req.body;
      if (data != undefined && data != null) {
        data.createddt =
          data.createddt === undefined
            ? CommonService.getCurrentDateTime()
            : data.createddt;
        data.createdby =
          data.createdby === undefined ? "SYSTEM" : data.createdby;
        data.loginid = data.emailid;
        // Check given user is already available. if not exist create new user else throw the error message
        let condition = {
          emailid: data.emailid,
          mobileno: data.mobileno,
        };
        const userResult = await CommonService.getOrSave(
          condition,
          data,
          db.User,
          []
        );
        if (userResult != null && userResult[1] === false) {
          respond.failed(
            AppConstants.STATUS_CODE[1],
            AppMessages.COMMON.FAILED.USEREXIST,
            AppMessages.COMMON.FAILED.USEREXIST
          );
        } else {
          respond.success(
            userResult,
            "SignUp Successfully",
            AppConstants.STATUS_CODE[1]
          );
        }
      } else {
        respond.failed(
          AppConstants.STATUS_CODE[0],
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
}

export default new Controller();
