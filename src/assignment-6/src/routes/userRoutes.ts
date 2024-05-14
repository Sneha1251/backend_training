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
const obj2 = new userValidation();
const obj3 = new locationValidate();
const obj4 = new queryValidate();
const obj5 = new generateApiUser();
const obj6 = new generateApiPost();
const obj7 = new authenticateProtected();
const obj8 = new authenticatePublic();
const obj9 = new middlewareCheck();
const obj10 = new errorCreated();
const obj11 = new asyncError();
const obj12 = new errorValidation();
const obj13 = new HealthCheckController();

app.get("/", obj1.mainPage);

app.post("/validate", validateRequest, obj2.validateUser);

app.get("/location", locationValidation, obj3.validateLoco);

app.post("/query/:id", queryValidation, obj4.validateQuery);

app.get("/api/users", obj5.generateUserApi);

app.post("/api/posts", obj6.generatePostApi);

app.get(
  "/authenticate/protected",
  generateDummyToken,
  jwtAuthentication,
  obj7.protectedAuth
);

app.get("/authenticate/public", obj8.publicAuth);

app.get(
  "/middleware",
  middleware1,
  middleware2,
  middleware3,
  obj9.checkMiddleware
);

app.get("/error-500", obj10.createError);

app.get("/async-error", obj11.createAsyncError);

app.get("/validation/error/:id", validationError, obj12.errorValidate);

app.get("/health", obj13.checkHealth);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
