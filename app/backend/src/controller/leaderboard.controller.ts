import { Request, Response } from "express";
import LeaderboardService from "../services/leaderboard.service";

export default class LeaderboardController {
  leaderboardService = new LeaderboardService();

  async getLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getLeaderboards();
    return res.status(200).json(leaderboard);
  };
}