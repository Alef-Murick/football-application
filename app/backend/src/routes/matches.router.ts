import { Router } from "express";
import MatchesController from "../controller/matches.controller";

const matchesRouter = Router();

const matches = new MatchesController();

matchesRouter.get('/', (req, res) => matches.getMatches(req, res));

export default matchesRouter