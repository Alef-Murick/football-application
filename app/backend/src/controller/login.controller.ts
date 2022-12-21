import { Request, Response } from "express";
import LoginService from "../services/login.service";

export default class LoginController {
  loginService = new LoginService();

  async login(req: Request, res: Response) {
    console.log(req.body);
    const { status, message } = await this.loginService.login(req.body);
    if (status === 200) {
      res.status(status).json({ token: message });
    }
    res.status(status).json({ message });
  }
}