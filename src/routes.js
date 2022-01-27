import { Router } from "express";
import SessionsController from "./controllers/SessionsController";
import auth from "./middlewares/auth";

const routes = new Router();

routes.post("/sessions", SessionsController.create);

routes.use(auth);

export default routes;