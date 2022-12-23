import { iTeam } from "../interfaces/iTeam";
import Team from "../database/models/Team"

export default class TeamsService {
  async  getAllTeams (): Promise <iTeam[]> {    
    const teams = await Team.findAll();
    console.log('teams in service', teams);
      return teams;
  }
}