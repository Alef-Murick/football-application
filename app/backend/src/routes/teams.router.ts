import { Router } from "express";
import TeamsController from "../controller/teams.controller";

const teamsRouter = Router();
const teams = new TeamsController();

teamsRouter.get('/', (req, res) => teams.getTeams(req, res));
teamsRouter.get('/:id', (req, res) => teams.getTeamById(req, res));

export default teamsRouter;