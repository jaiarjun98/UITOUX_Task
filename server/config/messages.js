export class ApplicationMessages {
  INTERNAL_ERROR = "Internal Error";
  COMMON = {
    FAILED: {
      DEFAULT: "Failed",
      ALREADYEXIST: "Already exist",
      USEREXIST:
        "This mobile number or email address is already registered, signin to continue",
    },
    NOTALLOWED: "Token not provided",
    INVALIDTOKEN: "Invalid token, or Token Not available.",
  };

  SIGNIN = {
    FAILED: {
      INVALID: "Username or Password is invalid",
      ALREADYEXIST: "User already exist",
    },
  };
}
export const AppMessages = new ApplicationMessages();
