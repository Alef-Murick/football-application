import { Router } from "express";
import Leaderboard from "../controller/leaderboard.controller";

const leaderboardRouter = Router();

const leader = new Leaderboard();

leaderboardRouter.post('/home', (req, res) => leader.getLeaderboard(req, res));

export default leaderboardRouter;