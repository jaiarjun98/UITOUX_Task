import * as crypto from "crypto";
import { AppConstants } from "../../config/constants.js";

const decrypt = function (text) {
  const decipher = crypto.createDecipher(
    "aes-256-cbc",
    AppConstants.SECRET_KEY_PWD
  );
  let decrypted = decipher.update(text.toString(), "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export default decrypt;
