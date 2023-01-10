import { Router } from "express";
import Leaderboard from "../controller/leaderboard.controller";

const leaderboardRouter = Router();

const leader = new Leaderboard();

leaderboardRouter.get('/home', (req, res) => leader.getLeaderboard(req, res));
leaderboardRouter.get('/away', (req, res) => leader.getLeaderboard(req, res));
leaderboardRouter.get('/', (req, res) => leader.getLeaderboard(req, res));

export default leaderboardRouter;