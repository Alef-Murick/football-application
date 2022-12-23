import { Request, Response } from "express";
import LoginService from "../services/login.service";

export default class LoginController {
  loginService = new LoginService();

  async login(req: Request, res: Response) {
    const { status, message } = await this.loginService.login(req.body);
    
    if (status === 200) {
      res.status(status).json({ token: message });
    }
    res.status(status).json({ message });
  }

  async getLogin(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (authorization) {
      const { status, message } = await this.loginService.validateLogin(authorization);
      if (status === 200) {
        res.status(status).json({ role: message });
      }
    }
    res.status(201).json({ message: 'Token required!' });
  }
}
  
// console.log('status~~~~~~~', status);
// console.log('message~~~~~~~', message);
// console.log('req.body~~~~~~~~~', req.body);