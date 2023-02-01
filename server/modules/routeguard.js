import express from "express";
import RespondModule from "./response.js";
import { AppConstants, AppMessages } from "../config/index.js";
const app = express();

app.use((req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    if (token == null || token == "" || token != 123456) {
      return new RespondModule( req, res).failed(
        AppConstants.STATUS_CODE[3],
        AppMessages.COMMON.INVALIDTOKEN,
        AppMessages.COMMON.INVALIDTOKEN
      );
    } else {
      // Proceed with further Execution
      next();
    }
  } else {
    return new RespondModule( req, res).failed(
      AppConstants.STATUS_CODE[4],
      AppMessages.COMMON.NOTALLOWED,
      ""
    );
  }
});

export default app;
