import { Request, Response } from "express";
import LeaderboardService from "../services/leaderboard.service";

export default class LeaderboardController {
  leaderboardService = new LeaderboardService();

  async getLeaderboard(req: Request, res: Response) {
    const path = req.path
    console.log('path', path);
    
    const leaderboard = await this.leaderboardService.getLeaderboards(path);
    // console.log('LEADERBOARD IN CONTROLLER~~~~~~~~~~~~~~', leaderboard);
    
    return res.status(200).json(leaderboard);
  };
}