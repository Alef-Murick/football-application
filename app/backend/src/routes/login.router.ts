import { Router } from "express";
import LoginController from "../controller/login.controller";

const loginRouter = Router();

const login = new LoginController();

loginRouter.post('/', (req, res) => login.login(req, res));

export default loginRouter;