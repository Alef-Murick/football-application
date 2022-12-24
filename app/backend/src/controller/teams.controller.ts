import { Request, Response } from "express";
import TeamsService from "../services/teams.service";

export default class TeamsController {
  teamsService = new TeamsService();

  async getTeams(req: Request, res: Response) {
    const teams = await this.teamsService.getAllTeams()
    
    return res.status(200).json(teams)
  }

  async getTeamById(req: Request, res: Response) {
    const id = Number(req.params.id);
    
    const { status, message } = await this.teamsService.getTeamById(id);
    
    return res.status(status).json(message);
  }
}

// console.log('id><><<><<><><><><><<><<',id);
// console.log('teams in controller');