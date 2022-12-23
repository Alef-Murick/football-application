import { Request, Response } from "express";
import TeamsService from "../services/teams.service";

export default class TeamsController {
  teamsService = new TeamsService();

  async getTeams(req: Request, res: Response) {
    const teams = await this.teamsService.getAllTeams()
    console.log('teams in controller');
    
    return res.status(200).json(teams)
  }
}