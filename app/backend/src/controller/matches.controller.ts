import { Request, Response } from "express";
import MatchesService from "../services/matches.service";

export default class MatchesController {
MatchesService = new MatchesService();
  
  async getMatches(_req: Request, res: Response) {
    const {status, message} = await this.MatchesService.getAllMatches();
    return res.status(status).json(message)
  }
}