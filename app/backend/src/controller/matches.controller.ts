import { Request, Response } from "express";
import MatchesService from "../services/matches.service";

export default class MatchesController {
MatchesService = new MatchesService();
  
  async getMatches(_req: Request, res: Response) {
    const {status, message} = await this.MatchesService.findAllMatches();
    return res.status(status).json(message);
  }

  async getLiveMatches(_req: Request, res: Response) {
    const { status, message } = await this.MatchesService.findLiveMatches();
    return res.status(status).json(message);
  }
}