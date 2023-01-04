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

  async postMatch(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body

    if (authorization) {
      const { status, message } = await this.MatchesService.createMatch(authorization, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals)
      console.log('STATUS IN CONTROLLER<<<<<>>>>>', status);
      console.log('MESSAGE IN CONTROLLER<<<<<>>>>>', message);
      if (status === 201) {
        return res.status(status).json(message);
      }
      return res.status(status).json({ message });
    }
    res.status(401).json({ message: 'Token must be a valid token' });
  }

  async patchMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.MatchesService.updateMatch(id)
    return res.status(200).json({ message: 'Finished' });
  }

  async patchLiveMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.MatchesService.updateLiveMatch(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Finished' });
  }
}