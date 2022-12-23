import { Router } from "express";
import TeamsController from "../controller/teams.controller";

const teamsRouter = Router();
const teams = new TeamsController();

teamsRouter.get('/', (req, res) =>  teams.getTeams(req, res));

export default teamsRouter;