import { Router } from "express";
import MatchesController from "../controller/matches.controller";

const matchesRouter = Router();

const matches = new MatchesController();

matchesRouter.get('/', (req, res) => matches.getMatches(req, res));
matchesRouter.post('/', (req, res) => matches.postMatch(req, res));
matchesRouter.patch('/:id/finish', (req, res) => matches.patchMatch(req, res));
matchesRouter.patch(':id', (req, res) => matches.patchLiveMatch(req, res));

export default matchesRouter