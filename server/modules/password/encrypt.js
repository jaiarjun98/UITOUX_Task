import * as crypto from "crypto";
import { AppConstants } from "../../config/constants.js";

const encrypt = function (text) {
  let cipher = crypto.createCipher("aes-256-cbc", AppConstants.SECRET_KEY_PWD);
  let crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

export default encrypt;
