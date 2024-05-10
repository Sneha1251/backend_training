import express from "express";
import dotenv from "dotenv";
dotenv.config();

import validateRequest from "../middlewares/validateRequest";
import queryValidation from "../middlewares/queryValidation";
import locationValidation from "../middlewares/locationValidation";

import jwtAuthentication from "../middlewares/jwtAuthentication";
import generateDummyToken from "../middlewares/generateDummyToken";

import requestLogger from "../middlewares/logger";
import customHeader from "../middlewares/customHeader";
import rateLimiter from "../middlewares/rateLimiter";

import errorHandler from "../middlewares/errorHandler";
import validationError from "../middlewares/validationError";

import {
  middleware1,
  middleware2,
  middleware3,
} from "../middlewares/middlewareChain";

import {
  homePage,
  userValidation,
  locationValidate,
  queryValidate,
  generateApiUser,
  generateApiPost,
  authenticateProtected,
  authenticatePublic,
  middlewareCheck,
  errorCreated,
  asyncError,
  errorValidation,
  HealthCheckController,
} from "../controllers/userController";

const app = express();

app.use(requestLogger);
app.use(customHeader("MyCustomValue"));
app.use(rateLimiter(1));

const obj1 = new homePage();
app.get("/", obj1.mainPage);

const obj2 = new userValidation();
app.post("/validate", validateRequest, obj2.validateUser);

const obj3 = new locationValidate();
app.get("/location", locationValidation, obj3.validateLoco);

const obj4 = new queryValidate();
app.post("/query/:id", queryValidation, obj4.validateQuery);

const obj5 = new generateApiUser();
app.get("/api/users", obj5.generateUserApi);

const obj6 = new generateApiPost();
app.post("/api/posts", obj6.generatePostApi);

const obj7 = new authenticateProtected();
app.get(
  "/authenticate/protected",
  generateDummyToken,
  jwtAuthentication,
  obj7.protectedAuth
);

const obj8 = new authenticatePublic();
app.get("/authenticate/public", obj8.publicAuth);

const obj9 = new middlewareCheck();
app.get(
  "/middleware",
  middleware1,
  middleware2,
  middleware3,
  obj9.checkMiddleware
);

const obj10 = new errorCreated();
app.get("/error-500", obj10.createError);

const obj11 = new asyncError();
app.get("/async-error", obj11.createAsyncError);

const obj12 = new errorValidation();
app.get("/validation/error/:id", validationError, obj12.errorValidate);

const obj13 = new HealthCheckController();
app.get("/health", obj13.checkHealth);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
