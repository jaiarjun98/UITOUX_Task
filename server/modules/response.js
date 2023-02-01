export default class respondModule {
  response = {
    status: false,
    message: "",
    data: "",
    err: "",
    code: 0,
  };
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  // Common function for Success Response
  success(data, message, code) {
    const response = this.response;
    try {
      response.message = message;
      response.status = true;
      response.code = code;
      response.data = data;
      delete response.err; // In success response error not required
      this.res.send(response);
    } catch (error) {
      console.log("error in Respond module", error);
    }
  }

  // Common function for Failure Response

  failed(code, message, err) {
    const response = this.response;
    try {
      response.message = message;
      response.status = false;
      response.err = err;
      response.code = code;
      delete response.data;
      this.res.send(response);
    } catch (error) {
      console.log("error in Respond module", error);
    }
  }
}
