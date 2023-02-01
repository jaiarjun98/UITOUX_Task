import express from "express";
import bodyParser from "body-parser";
import { RouteGuard } from "./modules/index.js";
import SignupController from "./api/controllers/auth/signup.js";
import SignInController from "./api/controllers/auth/signin.js";
import ProductController from "./api/controllers/masters/product.js";
import RatingController from "./api/controllers/masters/ratings.js";

const app = express();

export default class ExpressServer {
  constructor() {
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  }

  listen(port) {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

    //* We can define these routes in separate file based on the modules. As of now for an example i have just mentioned over here*//
    // Routes and Controller redirection
    app.post("/signup", SignupController.signup); // No Request Validation required, So that RouteGuard not added in middleware
    app.post("/signin", SignInController.signin); // No Request Validation required
    app.post("/product/list", RouteGuard, ProductController.all);
    app.post("/product/create", RouteGuard, ProductController.create);
    app.get("/product/:id", RouteGuard, ProductController.byId);
    app.post("/ratings/create", RouteGuard, RatingController.create);
    app.post("/ratings/all", RouteGuard, RatingController.all);
    return app;
  }
}
