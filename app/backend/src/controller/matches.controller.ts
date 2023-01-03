import { Request, Response } from "express";
import MatchesService from "../services/matches.service";

export default class MatchesController {
  MatchesService = new MatchesService();
  
  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    
    if (inProgress === 'true') {
      const { status, message } = await this.MatchesService.findLiveMatches();
      return res.status(status).json(message);
    }

    if (inProgress === 'false') {
      const { status, message } = await this.MatchesService.findFinishedMatches();
      return res.status(status).json(message);
    }

    const { status, message } = await this.MatchesService.findAllMatches();
    return res.status(status).json(message);
  }
}